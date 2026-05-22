import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import logoSvg from "../../../../assets/images/scrapsavvy-logo.svg";
import stampPng from "../../../../assets/images/stamp.png";

const toDataURL = (url) =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext("2d").drawImage(img, 0, 0);
      resolve(c.toDataURL("image/png"));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });

const COMPANY = {
  name: "ScrapSavvy Store Pvt. Ltd.",
  addr1: "Plot No. 47, Industrial Area, Bhosari",
  addr2: "Pune, Maharashtra – 411026",
  phone: "+91 20-2765-4321",
  email: "support@scrapsavvy.in",
  gstin: "27AABCS1234F1Z5",
  pan: "AABCS1234F",
  cin: "U52100MH2020PTC123456",
  state: "Maharashtra (27)",
};

const PINK = [255, 63, 108];
const BLACK = [17, 17, 17];
const LGRAY = [245, 245, 245];
const MGRAY = [220, 220, 220];
const DGRAY = [119, 119, 119];
const WHITE = [255, 255, 255];
const GREEN = [27, 94, 32];

const fmt = (v) => (v !== null && v !== undefined ? String(v) : "—");
const cur = (v) =>
  `Rs.${Number(v || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const fyInvNo = (orderId) => {
  const now = new Date();
  const yr = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  const fy = `${yr}-${String(yr + 1).slice(2)}`;
  const seq = String(orderId || 1).padStart(4, "0");
  return `PR-${fy}/${seq}`;
};

const toWords = (n) => {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  if (n === 0) return "Zero";
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thou = Math.floor((n % 100000) / 1000);
  const hund = Math.floor((n % 1000) / 100);
  const rest = n % 100;
  let w = "";
  if (crore) w += a[crore] + " Crore ";
  if (lakh)
    w +=
      (lakh < 20
        ? a[lakh]
        : b[Math.floor(lakh / 10)] + (lakh % 10 ? " " + a[lakh % 10] : "")) +
      " Lakh ";
  if (thou)
    w +=
      (thou < 20
        ? a[thou]
        : b[Math.floor(thou / 10)] + (thou % 10 ? " " + a[thou % 10] : "")) +
      " Thousand ";
  if (hund) w += a[hund] + " Hundred ";
  if (rest)
    w +=
      rest < 20
        ? a[rest]
        : b[Math.floor(rest / 10)] + (rest % 10 ? " " + a[rest % 10] : "");
  return w.trim() + " Rupees Only";
};

export const generateProductInvoice = async (order = {}) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  const customer = order.customer || {};
  const items = order.items || [];
  const invNo = fyInvNo(order.orderId);
  const invDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const [logoData, stampData] = await Promise.all([
    toDataURL(logoSvg),
    toDataURL(stampPng),
  ]);

  const setFont = (style, size, color) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(...(color || BLACK));
  };

  const hline = (y, lw, color) => {
    doc.setDrawColor(...(color || MGRAY));
    doc.setLineWidth(lw || 0.3);
    doc.line(10, y, W - 10, y);
  };

  // ── OUTER BORDER ──────────────────────────────────────────────────────────
  doc.setDrawColor(...BLACK);
  doc.setLineWidth(0.8);
  doc.rect(7, 7, W - 14, H - 14);

  // ── HEADER ────────────────────────────────────────────────────────────────
  doc.setFillColor(...WHITE);
  doc.rect(7, 7, W - 14, 30, "F");
  doc.setFillColor(...PINK);
  doc.rect(7, 36, W - 14, 2.5, "F");

  if (logoData) {
    doc.addImage(logoData, "PNG", 11, 11, 44, 15);
  } else {
    setFont("bold", 18, BLACK);
    doc.text("SCRAP", 11, 24);
    setFont("bold", 18, PINK);
    doc.text("SAVVY", 37, 24);
  }

  doc.setFillColor(...BLACK);
  doc.roundedRect(W - 55, 11, 44, 7, 1, 1, "F");
  setFont("bold", 7, WHITE);
  doc.text("ORIGINAL FOR BUYER", W - 33, 15.8, { align: "center" });

  setFont("bold", 13, BLACK);
  doc.text("TAX INVOICE", W - 11, 24, { align: "right" });
  setFont("normal", 8, DGRAY);
  doc.text(
    `Invoice No: ${invNo}   |   Date: ${invDate}   |   Order: #${order.orderId || "—"}`,
    W - 11,
    30,
    { align: "right" },
  );

  // ── COURIER STRIP ─────────────────────────────────────────────────────────
  doc.setFillColor(250, 250, 250);
  doc.rect(7, 38.5, W - 14, 11, "F");
  doc.setDrawColor(...MGRAY);
  doc.setLineWidth(0.2);
  doc.rect(7, 38.5, W - 14, 11);

  const courier = order.courier || {};
  setFont("bold", 6.5, DGRAY);
  doc.text("COURIER PARTNER", 12, 43);
  setFont("bold", 8.5, BLACK);
  doc.text(fmt(courier.name || "Delhivery"), 12, 47.5);
  setFont("bold", 6.5, DGRAY);
  doc.text("TRACKING NO.", 60, 43);
  setFont("bold", 8.5, PINK);
  doc.text(fmt(courier.trackingNo || "—"), 60, 47.5);
  setFont("bold", 6.5, DGRAY);
  doc.text("EXPECTED DELIVERY", 115, 43);
  setFont("bold", 8.5, BLACK);
  doc.text(fmt(courier.expectedDelivery || "—"), 115, 47.5);
  setFont("bold", 6.5, DGRAY);
  doc.text("STATUS", W - 40, 43);
  doc.setFillColor(232, 245, 232);
  doc.roundedRect(W - 40, 44.5, 28, 5.5, 1, 1, "F");
  setFont("bold", 7.5, GREEN);
  doc.text(fmt(order.orderStatus || "Shipped"), W - 26, 48, {
    align: "center",
  });

  // ── ADDRESS SECTION ───────────────────────────────────────────────────────
  let y = 54;
  hline(y, 0.2, MGRAY);
  y += 2;

  const col1x = 11,
    col2x = 76,
    col3x = 142;
  const addrH = 36;

  [
    [col1x, "SOLD BY (SELLER)"],
    [col2x, "BILLING ADDRESS"],
    [col3x, "SHIPPING ADDRESS"],
  ].forEach(([x, title]) => {
    doc.setFillColor(250, 250, 250);
    doc.rect(x - 1, y, 62, addrH, "F");
    doc.setDrawColor(...MGRAY);
    doc.setLineWidth(0.2);
    doc.rect(x - 1, y, 62, addrH);
    doc.setFillColor(...PINK);
    doc.rect(x - 1, y, 62, 1.5, "F");
    setFont("bold", 6.5, PINK);
    doc.text(title, x + 1, y + 5.5);
  });

  setFont("bold", 8.5, BLACK);
  doc.text(COMPANY.name, col1x + 1, y + 11);
  setFont("normal", 7.5, DGRAY);
  doc.text(COMPANY.addr1, col1x + 1, y + 16);
  doc.text(COMPANY.addr2, col1x + 1, y + 20.5);
  setFont("bold", 7, BLACK);
  doc.text(`GSTIN: ${COMPANY.gstin}`, col1x + 1, y + 25.5);
  doc.text(`PAN: ${COMPANY.pan}`, col1x + 1, y + 29.5);
  setFont("normal", 7, DGRAY);
  doc.text(COMPANY.email, col1x + 1, y + 33.5);

  setFont("bold", 8.5, BLACK);
  doc.text(fmt(customer.name), col2x + 1, y + 11);
  setFont("normal", 7.5, DGRAY);
  const billAddr = doc.splitTextToSize(fmt(customer.address), 56);
  doc.text(billAddr.slice(0, 2), col2x + 1, y + 16);
  doc.text(fmt(customer.email), col2x + 1, y + 26);
  doc.text(fmt(customer.mobile), col2x + 1, y + 30);
  if (customer.gstin) {
    setFont("bold", 7, PINK);
    doc.text(`GSTIN: ${customer.gstin}`, col2x + 1, y + 34.5);
  }

  setFont("bold", 8.5, BLACK);
  doc.text(fmt(customer.shippingName || customer.name), col3x + 1, y + 11);
  setFont("normal", 7.5, DGRAY);
  const shipAddr = doc.splitTextToSize(
    fmt(customer.shippingAddress || customer.address),
    56,
  );
  doc.text(shipAddr.slice(0, 2), col3x + 1, y + 16);
  setFont("bold", 7, BLACK);
  doc.text(
    `Place of supply: ${customer.placeOfSupply || COMPANY.state}`,
    col3x + 1,
    y + 27,
  );
  doc.text(`Place of origin: ${COMPANY.state}`, col3x + 1, y + 31.5);
  setFont("normal", 7, DGRAY);
  doc.text("Tax type: CGST + SGST (intra-state)", col3x + 1, y + 36);

  y += addrH + 5;
  hline(y, 0.2, MGRAY);
  y += 3;

  // ── ITEMS TABLE ───────────────────────────────────────────────────────────
  const tableBody = items.map((it, i) => {
    const qty = Number(it.quantity || 0);
    const price = Number(it.priceAtPurchase || it.price || 0);
    const mrp = Number(it.mrp || price * 1.1);
    const taxable = price * qty;
    const cgstAmt = taxable * 0.09;
    const sgstAmt = taxable * 0.09;
    const lineTotal = taxable; // GST shown for info only, not added again
    return [
      i + 1,
      `${it.productName || "—"}\nHSN: ${it.hsn || "—"}`,
      qty,
      cur(mrp),
      cur(price),
      cur(taxable),
      cur(cgstAmt),
      cur(sgstAmt),
      cur(lineTotal),
    ];
  });

  autoTable(doc, {
    startY: y,
    head: [
      [
        "#",
        "Product / HSN",
        "Qty",
        "MRP",
        "Unit Price",
        "Taxable Amt",
        "CGST 9%",
        "SGST 9%",
        "Total",
      ],
    ],
    body: tableBody,
    styles: {
      fontSize: 7.5,
      cellPadding: 3,
      textColor: BLACK,
      lineColor: MGRAY,
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: BLACK,
      textColor: WHITE,
      fontStyle: "bold",
      fontSize: 7.5,
    },
    alternateRowStyles: { fillColor: LGRAY },
    columnStyles: {
      0: { halign: "center", cellWidth: 8 },
      1: { cellWidth: 46 },
      2: { halign: "center", cellWidth: 10 },
      3: { halign: "right", cellWidth: 18 },
      4: { halign: "right", cellWidth: 18 },
      5: { halign: "right", cellWidth: 20 },
      6: { halign: "right", cellWidth: 16 },
      7: { halign: "right", cellWidth: 16 },
      8: { halign: "right", cellWidth: 20 },
    },
    margin: { left: 10, right: 10 },
  });

  y = doc.lastAutoTable.finalY + 5;

  // ── TOTALS + STAMP ────────────────────────────────────────────────────────
  // ✅ subtotal = price × qty (base, no GST)
  // ✅ cgst/sgst = calculated from subtotal — shown for DISPLAY ONLY (already inside totalAmount)
  // ✅ grand total = subtotal only (GST is included in price, not added again)
  const subtotal = items.reduce((s, it) => {
    return (
      s + Number(it.priceAtPurchase || it.price || 0) * Number(it.quantity || 0)
    );
  }, 0);
  const discount = Number(order.discount || 0);
  const cgstTotal = subtotal * 0.09; // display only
  const sgstTotal = subtotal * 0.09; // display only
  // ✅ Grand total = subtotal (GST already included in price, not added again)
  const grand = subtotal - discount;

  // Stamp left
  if (stampData) {
    doc.addImage(stampData, "PNG", 11, y + 2, 32, 32, undefined, "FAST");
  }

  const totX = W - 76;
  const totW = 66;

  const totRows = [
    ["Subtotal (taxable value)", cur(subtotal)],
    ...(discount > 0 ? [["Discount", `- ${cur(discount)}`]] : []),
    ["CGST 9% (included)", cur(cgstTotal)],
    ["SGST 9% (included)", cur(sgstTotal)],
    ["Shipping charges", "FREE"],
  ];

  let ty = y;
  totRows.forEach(([label, val], i) => {
    doc.setFillColor(...(i % 2 === 0 ? LGRAY : WHITE));
    doc.rect(totX, ty, totW, 7, "F");
    doc.setDrawColor(...MGRAY);
    doc.setLineWidth(0.2);
    doc.rect(totX, ty, totW, 7);
    setFont("normal", 7.5, DGRAY);
    doc.text(label, totX + 3, ty + 5);
    setFont("bold", 7.5, label.startsWith("Discount") ? [200, 0, 0] : BLACK);
    doc.text(val, totX + totW - 3, ty + 5, { align: "right" });
    ty += 7;
  });

  // Grand total pink bar
  doc.setFillColor(...PINK);
  doc.rect(totX, ty, totW, 14, "F");
  setFont("bold", 8.5, WHITE);
  doc.text("GRAND TOTAL (GST Inclusive)", totX + 3, ty + 6);
  setFont("bold", 10, WHITE);
  doc.text(cur(grand), totX + totW - 3, ty + 6, { align: "right" });
  setFont("normal", 6.5, [255, 220, 230]);
  doc.text("Incl. CGST 9% + SGST 9% — no extra tax charged", totX + 3, ty + 12);

  ty += 14;

  // Amount in words
  setFont("normal", 7, DGRAY);
  doc.text(`Amount in words: ${toWords(Math.round(grand))}`, 11, ty);

  ty += 6;

  // Return policy
  doc.setFillColor(255, 245, 247);
  doc.setDrawColor(...PINK);
  doc.setLineWidth(0.2);
  doc.rect(10, ty, W - 20, 8, "F");
  doc.rect(10, ty, W - 20, 8);
  setFont("normal", 7, [153, 0, 51]);
  doc.text(
    "Returns accepted within 7 days of delivery. To raise a return, contact support@scrapsavvy.in or call +91 20-2765-4321.",
    W / 2,
    ty + 5,
    { align: "center" },
  );

  ty += 12;

  // Declaration
  doc.setFillColor(250, 250, 250);
  doc.rect(10, ty, W - 20, 10, "F");
  hline(ty, 0.2);
  hline(ty + 10, 0.2);
  setFont("normal", 7, DGRAY);
  doc.text(
    "Declaration: We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct. " +
      "This is a computer generated invoice and does not require a physical signature.",
    W / 2,
    ty + 6,
    { align: "center", maxWidth: W - 24 },
  );

  // ── FOOTER ────────────────────────────────────────────────────────────────
  const footY = H - 18;

  doc.setFillColor(...PINK);
  doc.rect(7, footY, W - 14, 2, "F");
  doc.setFillColor(17, 17, 17);
  doc.rect(7, footY + 2, W - 14, 16, "F");

  setFont("bold", 8, WHITE);
  doc.text(COMPANY.name, 12, footY + 8);
  setFont("normal", 6.5, [180, 180, 180]);
  doc.text(
    `${COMPANY.addr1}, ${COMPANY.addr2}  |  ${COMPANY.phone}  |  ${COMPANY.email}`,
    12,
    footY + 13,
  );
  setFont("bold", 7, PINK);
  doc.text(
    `GSTIN: ${COMPANY.gstin}  |  PAN: ${COMPANY.pan}`,
    W - 11,
    footY + 8,
    { align: "right" },
  );
  setFont("normal", 6.5, [180, 180, 180]);
  doc.text(`CIN: ${COMPANY.cin}`, W - 11, footY + 13, { align: "right" });

  // ── SAVE ──────────────────────────────────────────────────────────────────
  doc.save(`ScrapSavvy_Invoice_${order.orderId || "NA"}.pdf`);
};
