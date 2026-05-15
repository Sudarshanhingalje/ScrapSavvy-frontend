import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ── Flipkart-style Blue Theme ──────────────────────────────────────────
// Primary  : #2874F0  (Flipkart blue)
// Dark     : #0D47A1  (deep navy)
// Accent   : #FFD700  (gold – for highlights)
// Light bg : #E8F0FE  (very light blue)
// Mid blue : #1565C0

export const generateInvoice = (order) => {
  const doc = new jsPDF();
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  // ── Outer navy border ───────────────────────────────────────────────
  doc.setDrawColor(13, 71, 161);
  doc.setLineWidth(1.5);
  doc.rect(6, 6, W - 12, H - 12);

  // Inner thin blue border
  doc.setLineWidth(0.3);
  doc.setDrawColor(40, 116, 240);
  doc.rect(9, 9, W - 18, H - 18);

  // ── Header (Flipkart blue bar) ──────────────────────────────────────
  doc.setFillColor(40, 116, 240);
  doc.rect(9, 9, W - 18, 28, "F");

  // Dark navy accent strip at bottom of header
  doc.setFillColor(13, 71, 161);
  doc.rect(9, 35, W - 18, 2, "F");

  // Logo circle
  doc.setFillColor(255, 255, 255);
  doc.circle(22, 23, 8, "F");
  doc.setFillColor(40, 116, 240);
  doc.triangle(17, 28, 22, 17, 27, 28, "F");
  doc.setFillColor(255, 255, 255);
  doc.circle(22, 27, 2, "F");

  // Company name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("ScrapSavvy", 33, 21);

  doc.setFontSize(7);
  doc.setTextColor(210, 227, 252);
  doc.text("RECYCLE  ·  REUSE  ·  REWARD", 33, 27);

  // Invoice number
  const invNo = `INV #SS-${new Date().getFullYear()}-${String(order.id).padStart(5, "0")}`;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(invNo, W - 14, 19, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(210, 227, 252);
  doc.text(
    `Date: ${new Date(order.created_at || order.createdAt).toLocaleDateString("en-IN")}`,
    W - 14,
    25,
    { align: "right" },
  );
  doc.text(`Order ID: #${order.id}`, W - 14, 31, { align: "right" });

  // ── Section helper ──────────────────────────────────────────────────
  const sectionBar = (label, y) => {
    doc.setFillColor(21, 101, 192);
    doc.rect(10, y, W - 20, 7, "F");
    // Gold left accent
    doc.setFillColor(255, 215, 0);
    doc.rect(10, y, 3, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text(label, 16, y + 4.8);
    return y + 10;
  };

  // ── Field box helper ────────────────────────────────────────────────
  const fieldBox = (label, value, x, y, w, h = 14) => {
    // Light blue fill
    doc.setFillColor(232, 240, 254);
    doc.rect(x, y, w, h, "F");
    // Label tint strip
    doc.setFillColor(207, 226, 255);
    doc.rect(x, y, w, 5.5, "F");
    // Border
    doc.setDrawColor(40, 116, 240);
    doc.setLineWidth(0.3);
    doc.rect(x, y, w, h);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(21, 101, 192);
    doc.text(label.toUpperCase(), x + 2.5, y + 4.5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(13, 27, 62);
    const val = String(value || "—");
    doc.text(val.substring(0, 36), x + 2.5, y + 10.5);
  };

  // ── Company Information ────────────────────────────────────────────
  let y = sectionBar("COMPANY INFORMATION", 41);

  const hw = (W - 20) / 2;
  fieldBox("Company Name", order.company_name || order.companyName, 10, y, hw);
  fieldBox(
    "Company ID",
    `CUST-${order.company_id || order.companyId || "N/A"}`,
    10 + hw,
    y,
    hw,
  );
  y += 16;

  const tw = (W - 20) / 3;
  fieldBox("Email", order.user_email || order.userEmail, 10, y, tw);
  fieldBox("Contact No.", order.contact_no || order.contactNo, 10 + tw, y, tw);
  fieldBox(
    "Order Date",
    new Date(order.created_at || order.createdAt).toLocaleDateString("en-IN"),
    10 + tw * 2,
    y,
    tw,
  );
  y += 16;

  fieldBox(
    "Pickup Address",
    order.pickup_address || order.pickupAddress,
    10,
    y,
    W - 20,
  );
  y += 16;

  // ── Order Details Table ─────────────────────────────────────────────
  y = sectionBar("ORDER DETAILS", y + 2);

  autoTable(doc, {
    startY: y,
    head: [
      [
        "#",
        "Scrap Type",
        "Qty (kg)",
        "Rate / kg",
        "Paid Amount",
        "Total Price",
      ],
    ],
    body: [
      [
        "1",
        order.scrap_type || order.scrapType,
        `${order.quantity} kg`,
        ` ${Number(order.price_per_kg || order.pricePerKg).toFixed(2)}`,
        ` ${Number(order.paid_amount || order.paidAmount || 0).toFixed(2)}`,
        ` ${Number(order.total_price || order.totalPrice).toFixed(2)}`,
      ],
    ],
    headStyles: {
      fillColor: [40, 116, 240],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8,
      cellPadding: 3,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [13, 27, 62],
      cellPadding: 3,
      fillColor: [232, 240, 254],
    },
    alternateRowStyles: { fillColor: [255, 255, 255] },
    tableLineColor: [40, 116, 240],
    tableLineWidth: 0.3,
    margin: { left: 10, right: 10 },
  });

  y = doc.lastAutoTable.finalY + 4;

  // ── Pickup & Driver Info ────────────────────────────────────────────
  y = sectionBar("PICKUP & DRIVER INFORMATION", y);

  fieldBox(
    "Pickup Date",
    order.pickup_date || order.pickupDate || "—",
    10,
    y,
    hw,
  );
  fieldBox(
    "Pickup Time",
    order.pickup_time || order.pickupTime || "—",
    10 + hw,
    y,
    hw,
  );
  y += 16;
  fieldBox(
    "Assigned Driver",
    order.assigned_driver || order.assignedDriver || "—",
    10,
    y,
    hw,
  );
  fieldBox(
    "Driver Contact",
    order.driver_contact_no || order.driverContactNo || "—",
    10 + hw,
    y,
    hw,
  );
  y += 18;

  // ── Payment Details + Totals ────────────────────────────────────────
  y = sectionBar("PAYMENT DETAILS", y);

  const leftW = (W - 20) * 0.55;
  const rightW = (W - 20) * 0.45;
  const boxH = 50;

  // Payment box – light blue fill
  doc.setFillColor(232, 240, 254);
  doc.rect(10, y, leftW, boxH, "F");
  doc.setDrawColor(40, 116, 240);
  doc.setLineWidth(0.3);
  doc.rect(10, y, leftW, boxH);

  // Split: payment info (left 58%) + stamp (right 42%)
  const payInfoW = leftW * 0.58;
  const stampAreaX = 10 + payInfoW;
  const stampAreaW = leftW - payInfoW;

  // Vertical divider
  doc.setDrawColor(150, 190, 255);
  doc.setLineWidth(0.4);
  doc.line(stampAreaX, y + 2, stampAreaX, y + boxH - 2);

  // Payment Status
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(21, 101, 192);
  doc.text("PAYMENT STATUS", 13, y + 6);

  const isPaid =
    (order.payment_status || order.paymentStatus || "").toUpperCase() ===
    "PAID";

  if (isPaid) {
    doc.setFillColor(232, 245, 238);
    doc.rect(13, y + 8, 36, 8, "F");
    doc.setDrawColor(26, 122, 60);
    doc.setLineWidth(0.4);
    doc.rect(13, y + 8, 36, 8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(26, 122, 60);
    doc.text("● PAID", 20, y + 13.5);
  } else {
    doc.setFillColor(255, 243, 224);
    doc.rect(13, y + 8, 40, 8, "F");
    doc.setDrawColor(176, 96, 0);
    doc.rect(13, y + 8, 40, 8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(176, 96, 0);
    doc.text("● PENDING", 18, y + 13.5);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(21, 101, 192);
  doc.text("PAYMENT METHOD", 13, y + 24);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(13, 27, 62);
  doc.text(order.payment_method || order.paymentMethod || "—", 13, y + 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(21, 101, 192);
  doc.text("PAYMENT ID", 13, y + 38);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(13, 27, 62);
  doc.text(
    String(order.payment_id || order.paymentId || "—").substring(0, 32),
    13,
    y + 44,
  );

  // ── Stamp Image ─────────────────────────────────────────────────────
  try {
    const stampSrc = order.stampBase64 || "../../assets/images/stamp.png";
    const stampSize = Math.min(stampAreaW - 3, boxH - 6);
    const stampX = stampAreaX + (stampAreaW - stampSize) / 2;
    const stampY = y + (boxH - stampSize) / 2;
    doc.addImage(
      stampSrc,
      "PNG",
      stampX,
      stampY,
      stampSize,
      stampSize,
      undefined,
      "FAST",
    );
  } catch (e) {
    console.warn("Stamp image could not be loaded:", e);
  }

  // ── Totals box (right side) ─────────────────────────────────────────
  const rx = 10 + leftW + 2;
  const gst = Math.round((order.total_price || order.totalPrice) * 0.18);
  const grand = Math.round(order.total_price || order.totalPrice);

  const totRows = [
    [
      "Item Total with GST",
      `Rs.${Number(order.total_price || order.totalPrice).toFixed(2)}`,
    ],
    ["GST (18%)", `Rs.${gst}.00`],
    ["Pickup Charges", "FREE"],
    [
      "Paid Amount",
      `Rs.${Number(order.paid_amount || order.paidAmount || 0).toFixed(2)}`,
    ],
  ];

  let ty = y;
  totRows.forEach(([label, val], i) => {
    const rowFill = i % 2 === 0 ? [232, 240, 254] : [255, 255, 255];
    doc.setFillColor(...rowFill);
    doc.rect(rx, ty, rightW, 9, "F");
    doc.setDrawColor(40, 116, 240);
    doc.setLineWidth(0.2);
    doc.rect(rx, ty, rightW, 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(60, 80, 120);
    doc.text(label, rx + 3, ty + 6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(13, 27, 62);
    doc.text(val, rx + rightW - 3, ty + 6, { align: "right" });
    ty += 9;
  });

  // Grand Total – Flipkart blue bar with gold amount
  doc.setFillColor(40, 116, 240);
  doc.rect(rx, ty, rightW, 13, "F");
  doc.setFillColor(255, 215, 0); // gold top accent line
  doc.rect(rx, ty, rightW, 1.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("GRAND TOTAL", rx + 3, ty + 9);
  doc.setTextColor(255, 215, 0);
  doc.text(`Rs.${grand.toLocaleString("en-IN")}`, rx + rightW - 3, ty + 9, {
    align: "right",
  });

  // ── Footer ──────────────────────────────────────────────────────────
  const footY = H - 22;

  doc.setFillColor(13, 71, 161); // dark navy footer
  doc.rect(9, footY, W - 18, 18, "F");
  doc.setFillColor(40, 116, 240); // blue top strip
  doc.rect(9, footY, W - 18, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 215, 0);
  doc.text("ScrapSavvy Pvt. Ltd.", 14, footY + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(200, 220, 255);
  doc.text(
    "Plot No. 47, Industrial Area, Bhosari, Pune, Maharashtra – 411026  |  +91 20-2765-4321  |  support@scrapsavvy.in",
    14,
    footY + 13,
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(255, 215, 0);
  doc.text("GSTIN: 27AABCS1234F1Z5", W - 14, footY + 8, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(200, 220, 255);
  doc.text("Thank you for choosing ScrapSavvy!", W - 14, footY + 13, {
    align: "right",
  });

  doc.save(`ScrapSavvy_Invoice_${order.id}.pdf`);
};
