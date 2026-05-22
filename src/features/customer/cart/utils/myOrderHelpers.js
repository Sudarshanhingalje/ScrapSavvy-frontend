// src/features/customer/cart/utils/myOrderHelpers.js

import { STATUS_CONFIG } from "./myOrderConstants";

// ================= DATE =================
export const formatOrderDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ================= SAFE ITEM TOTAL =================
export const calcItemTotal = (price, quantity) => {
  return Number(price || 0) * Number(quantity || 0);
};

// ================= CART TOTAL (ONLY SOURCE OF TRUTH) =================
export const getCartTotal = (items = []) => {
  return items.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const qty = Number(item.quantity || item.qty || 0);
    return sum + price * qty;
  }, 0);
};

// ================= ITEM COUNT =================
export const getCartItemsCount = (items = []) => {
  return items.reduce((sum, item) => {
    return sum + Number(item.quantity || item.qty || 0);
  }, 0);
};

// ================= ORDER TOTAL (FROM BACKEND) =================
export const calcOrderTotal = (items = []) => {
  return items.reduce((sum, item) => {
    const price = Number(item.priceAtPurchase || item.price || 0);
    const qty = Number(item.quantity || item.qty || 0);
    return sum + price * qty;
  }, 0);
};

// ================= FORMAT =================
export const formatCurrency = (amount) => {
  return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;
};

// ================= STATUS =================
export const getStatusConfig = (status) => {
  const key = status?.toUpperCase();
  return STATUS_CONFIG[key] || STATUS_CONFIG["PROCESSING"];
};
