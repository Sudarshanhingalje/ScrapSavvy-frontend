// DISCOUNT PERCENT BASED ON TOTAL

export const getDiscountPercentage = (amount = 0) => {
  if (amount >= 100000) {
    return 10;
  }

  if (amount >= 50000) {
    return 7;
  }

  if (amount >= 40000) {
    return 5;
  }

  if (amount >= 20000) {
    return 2;
  }

  return 0;
};

// ORIGINAL TOTAL (WITHOUT DISCOUNT)

export const getCartMrpTotal = (items = []) => {
  return items.reduce((total, item) => {
    const qty = item.qty || item.quantity || 1;

    const mrp = item.mrp || item.price || 0;

    return total + mrp * qty;
  }, 0);
};

// DISCOUNT AMOUNT

export const getCartDiscount = (items = []) => {
  const mrpTotal = getCartMrpTotal(items);

  const discountPercentage = getDiscountPercentage(mrpTotal);

  return Math.floor((mrpTotal * discountPercentage) / 100);
};

// FINAL TOTAL AFTER DISCOUNT

export const getCartTotal = (items = []) => {
  const mrpTotal = getCartMrpTotal(items);

  const discount = getCartDiscount(items);

  return mrpTotal - discount;
};

// TOTAL ITEMS COUNT

export const getCartItemsCount = (items = []) => {
  return items.reduce((total, item) => {
    return total + (item.qty || item.quantity || 1);
  }, 0);
};
