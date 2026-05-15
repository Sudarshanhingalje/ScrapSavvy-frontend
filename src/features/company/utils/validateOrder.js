export const validateOrder = (form) => {
  const e = {};

  if (!form.companyName.trim()) {
    e.companyName = "Please enter your name";
  }

  if (!form.pickupAddress.trim()) {
    e.pickupAddress = "Please enter a pickup address";
  }

  if (!form.quantity || Number(form.quantity) <= 0) {
    e.quantity = "Please enter a valid quantity";
  }

  return e;
};
