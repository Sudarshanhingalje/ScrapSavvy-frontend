export const calculateDiscount = (mrp, price) => {
  const m = parseFloat(mrp);
  const s = parseFloat(price);
  if (m > 0 && s > 0 && s < m) return `${Math.round(((m - s) / m) * 100)}% off`;
  return null;
};
