// =====================
// SINGLE SOURCE OF TRUTH
// =====================

// Always use purchase price OR fallback price OR mrp
export const getUnitPrice = (item) => {
  return Number(item.priceAtPurchase ?? item.price ?? item.mrp ?? 0);
};

// Always normalize quantity
export const getQty = (item) => {
  return Number(item.quantity ?? item.qty ?? 0);
};

// ---------------------
// RAW SUBTOTAL (NO TAX, NO DISCOUNT)
// ---------------------
export const getSubtotal = (items = []) => {
  return items.reduce((sum, item) => {
    return sum + getUnitPrice(item) * getQty(item);
  }, 0);
};

// ---------------------
// DISCOUNT LOGIC
// ---------------------
export const getDiscountPercentage = (amount = 0) => {
  if (amount >= 100000) return 10;
  if (amount >= 50000) return 7;
  if (amount >= 40000) return 5;
  if (amount >= 20000) return 2;
  return 0;
};

export const getCartDiscount = (items = []) => {
  const subtotal = getSubtotal(items);
  const pct = getDiscountPercentage(subtotal);
  return Math.floor((subtotal * pct) / 100);
};

// ---------------------
// AFTER DISCOUNT (TAX BASE)
// ---------------------
export const getDiscountedSubtotal = (items = []) => {
  return getSubtotal(items) - getCartDiscount(items);
};

// ---------------------
// GST (APPLIED ON DISCOUNTED AMOUNT)
// ---------------------
export const getCGST = (amount) => amount * 0.09;
export const getSGST = (amount) => amount * 0.09;
export const getGST = (amount) => amount * 0.18;

// ---------------------
// FINAL TOTAL
// ---------------------
export const getTotal = (items = []) => {
  const discounted = getDiscountedSubtotal(items);
  return discounted + getGST(discounted);
};

// ---------------------
// ITEM COUNT
// ---------------------
export const getCartItemsCount = (items = []) => {
  return items.reduce((sum, item) => sum + getQty(item), 0);
};
