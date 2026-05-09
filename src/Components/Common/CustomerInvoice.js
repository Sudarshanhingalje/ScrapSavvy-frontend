import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ── ScrapSavvy Industrial Green Theme ─────────────────────────────────
// Primary  : #2E7D32  (forest green)
// Dark     : #1B5E20  (deep dark green)
// Accent   : #FF6F00  (rust/amber orange – for highlights)
// Light bg : #E8F5E9  (very light green)
// Mid      : #388E3C  (mid green)
// Text     : #1A2E1A  (near-black green-tinted)

export const generateCustomerInvoice = (order) => {
  const doc = new jsPDF();
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  // ── Outer dark green border ─────────────────────────────────────────
  doc.setDrawColor(27, 94, 32);
  doc.setLineWidth(1.5);
  doc.rect(6, 6, W - 12, H - 12);

  // Inner thin green border
  doc.setLineWidth(0.3);
  doc.setDrawColor(46, 125, 50);
  doc.rect(9, 9, W - 18, H - 18);

  // ── Header (forest green bar) ───────────────────────────────────────
  doc.setFillColor(46, 125, 50);
  doc.rect(9, 9, W - 18, 28, "F");

  // Dark green accent strip at bottom of header
  doc.setFillColor(27, 94, 32);
  doc.rect(9, 35, W - 18, 2, "F");

  // Logo circle
  doc.setFillColor(255, 255, 255);
  doc.circle(22, 23, 8, "F");
  doc.setFillColor(46, 125, 50);
  doc.triangle(17, 28, 22, 17, 27, 28, "F");
  doc.setFillColor(255, 255, 255);
  doc.circle(22, 27, 2, "F");

  // Company name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("ScrapSavvy", 33, 21);

  doc.setFontSize(7);
  doc.setTextColor(200, 230, 201);
  doc.text("RECYCLE  ·  REUSE  ·  REWARD", 33, 27);

  // Invoice number
  const invNo = `INV #SS-${new Date().getFullYear()}-${String(order.id).padStart(5, "0")}`;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(invNo, W - 14, 19, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(200, 230, 201);
  doc.text(
    `Date: ${new Date(order.created_at || order.createdAt).toLocaleDateString("en-IN")}`,
    W - 14,
    25,
    { align: "right" },
  );
  doc.text(`Order ID: #${order.id}`, W - 14, 31, { align: "right" });

  // ── Section helper ──────────────────────────────────────────────────
  const sectionBar = (label, y) => {
    doc.setFillColor(56, 142, 60);
    doc.rect(10, y, W - 20, 7, "F");
    // Rust/orange left accent
    doc.setFillColor(255, 111, 0);
    doc.rect(10, y, 3, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text(label, 16, y + 4.8);
    return y + 10;
  };

  // ── Field box helper ────────────────────────────────────────────────
  const fieldBox = (label, value, x, y, w, h = 14) => {
    // Light green fill
    doc.setFillColor(232, 245, 233);
    doc.rect(x, y, w, h, "F");
    // Label tint strip
    doc.setFillColor(200, 230, 201);
    doc.rect(x, y, w, 5.5, "F");
    // Border
    doc.setDrawColor(46, 125, 50);
    doc.setLineWidth(0.3);
    doc.rect(x, y, w, h);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(27, 94, 32);
    doc.text(label.toUpperCase(), x + 2.5, y + 4.5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(26, 46, 26);
    const val = String(value || "—");
    doc.text(val.substring(0, 36), x + 2.5, y + 10.5);
  };

  // ── Customer Information ────────────────────────────────────────────
  let y = sectionBar("CUSTOMER INFORMATION", 41);

  const hw = (W - 20) / 2;
  fieldBox(
    "Customer Name",
    order.customer_name ||
      order.customerName ||
      order.userName ||
      order.name ||
      order.fullName,
    10,
    y,
    hw,
  );
  fieldBox(
    "Customer ID",
    `CUST-${order.customer_id || order.customerId || "N/A"}`,
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
      fillColor: [46, 125, 50],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8,
      cellPadding: 3,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [26, 46, 26],
      cellPadding: 3,
      fillColor: [232, 245, 233],
    },
    alternateRowStyles: { fillColor: [255, 255, 255] },
    tableLineColor: [46, 125, 50],
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

  // Payment box – light green fill
  doc.setFillColor(232, 245, 233);
  doc.rect(10, y, leftW, boxH, "F");
  doc.setDrawColor(46, 125, 50);
  doc.setLineWidth(0.3);
  doc.rect(10, y, leftW, boxH);

  // Split: payment info (left 58%) + stamp (right 42%)
  const payInfoW = leftW * 0.58;
  const stampAreaX = 10 + payInfoW;
  const stampAreaW = leftW - payInfoW;

  // Vertical divider
  doc.setDrawColor(150, 210, 150);
  doc.setLineWidth(0.4);
  doc.line(stampAreaX, y + 2, stampAreaX, y + boxH - 2);

  // Payment Status
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(27, 94, 32);
  doc.text("PAYMENT STATUS", 13, y + 6);

  const isPaid =
    (order.payment_status || order.paymentStatus || "").toUpperCase() ===
    "PAID";

  if (isPaid) {
    doc.setFillColor(232, 245, 233);
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
  doc.setTextColor(27, 94, 32);
  doc.text("PAYMENT METHOD", 13, y + 24);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(26, 46, 26);
  doc.text(order.payment_method || order.paymentMethod || "—", 13, y + 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(27, 94, 32);
  doc.text("PAYMENT ID", 13, y + 38);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(26, 46, 26);
  doc.text(
    String(order.payment_id || order.paymentId || "—").substring(0, 32),
    13,
    y + 44,
  );

  // ── Stamp Image ─────────────────────────────────────────────────────
  try {
    const stampSrc = order.stampBase64 || "/stamp.png";
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
    const rowFill = i % 2 === 0 ? [232, 245, 233] : [255, 255, 255];
    doc.setFillColor(...rowFill);
    doc.rect(rx, ty, rightW, 9, "F");
    doc.setDrawColor(46, 125, 50);
    doc.setLineWidth(0.2);
    doc.rect(rx, ty, rightW, 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(60, 100, 60);
    doc.text(label, rx + 3, ty + 6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 46, 26);
    doc.text(val, rx + rightW - 3, ty + 6, { align: "right" });
    ty += 9;
  });

  // Grand Total – forest green bar with rust/orange amount
  doc.setFillColor(46, 125, 50);
  doc.rect(rx, ty, rightW, 13, "F");
  doc.setFillColor(255, 111, 0); // rust/orange top accent line
  doc.rect(rx, ty, rightW, 1.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("GRAND TOTAL", rx + 3, ty + 9);
  doc.setTextColor(255, 111, 0);
  doc.text(`Rs.${grand.toLocaleString("en-IN")}`, rx + rightW - 3, ty + 9, {
    align: "right",
  });

  // ── Footer ──────────────────────────────────────────────────────────
  const footY = H - 22;

  doc.setFillColor(27, 94, 32); // dark green footer
  doc.rect(9, footY, W - 18, 18, "F");
  doc.setFillColor(46, 125, 50); // green top strip
  doc.rect(9, footY, W - 18, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 111, 0); // rust orange company name
  doc.text("ScrapSavvy Pvt. Ltd.", 14, footY + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(200, 230, 201);
  doc.text(
    "Plot No. 47, Industrial Area, Bhosari, Pune, Maharashtra – 411026  |  +91 20-2765-4321  |  support@scrapsavvy.in",
    14,
    footY + 13,
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(255, 111, 0); // rust orange GSTIN
  doc.text("GSTIN: 27AABCS1234F1Z5", W - 14, footY + 8, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(200, 230, 201);
  doc.text("Thank you for choosing ScrapSavvy!", W - 14, footY + 13, {
    align: "right",
  });

  doc.save(`ScrapSavvy_Invoice_${order.id}.pdf`);
};
