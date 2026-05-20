// src/features/customer/cart/utils/myOrderHelpers.js

import { STATUS_CONFIG } from "./myOrderConstants";

export const formatOrderDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const calcItemTotal = (price, quantity) => {
  return price * quantity;
};

export const calcOrderTotal = (items = []) => {
  return items.reduce((sum, item) => {
    const price = item.priceAtPurchase || 0;
    return sum + price * (item.quantity || 0);
  }, 0);
};

export const formatCurrency = (amount) => {
  return `₹ ${Number(amount).toLocaleString("en-IN")}`;
};

export const getStatusConfig = (status) => {
  const key = status?.toUpperCase();
  return STATUS_CONFIG[key] || STATUS_CONFIG["PROCESSING"];
};
