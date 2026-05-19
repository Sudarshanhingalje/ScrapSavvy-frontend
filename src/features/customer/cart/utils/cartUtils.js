export const getCartTotal = (items = []) => {
  return items.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);
};

export const getCartItemsCount = (items = []) => {
  return items.reduce((total, item) => {
    return total + item.qty;
  }, 0);
};

export const getCartMrpTotal = (items = []) => {
  return items.reduce((total, item) => {
    return total + (item.mrp || item.price) * item.qty;
  }, 0);
};

export const getCartDiscount = (items = []) => {
  return getCartMrpTotal(items) - getCartTotal(items);
};
