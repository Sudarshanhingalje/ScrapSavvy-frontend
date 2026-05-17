export const calcQuality = (f) => {
  let s = 0;
  if (f.productName.length > 10) s += 15;
  if (f.productName.length > 40) s += 10;
  if (f.description.length > 50) s += 10;
  if (f.description.length > 150) s += 15;
  if (f.categoryId) s += 10;
  if (f.price) s += 10;
  if (f.mrp) s += 5;
  if (f.quantity) s += 5;
  if (f.images.length >= 1) s += 10;
  if (f.images.length >= 3) s += 5;
  if (f.brand) s += 5;
  return Math.min(s, 100);
};

export const qualityLabel = (s) => {
  if (s < 30) return { text: "Poor", color: "#dc2626" };
  if (s < 60) return { text: "Fair", color: "#d97706" };
  if (s < 80) return { text: "Good", color: "#2563eb" };
  return { text: "Excellent", color: "#16a34a" };
};
