export const formatPrice = (price) => {
  if (!price) return "₹0";

  return `₹${Number(price).toLocaleString("en-IN")}`;
};

export const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getTotalItems = (items) => {
  if (!items || !items.length) return 0;

  return items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};
