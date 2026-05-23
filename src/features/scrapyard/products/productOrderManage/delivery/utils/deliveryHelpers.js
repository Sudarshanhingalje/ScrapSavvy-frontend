// ============================
// FORMAT DELIVERY DATE
// ============================

export const formatDeliveryDate = (date) => {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return date;
  }
};

// ============================
// FORMAT SHORT DATE
// ============================

export const formatShortDate = (date) => {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return date;
  }
};

// ============================
// GET CUSTOMER NAME FROM ORDER
// ============================

export const getCustomerName = (order) => {
  if (!order?.userProfile) return "N/A";
  const profile = order.userProfile;
  return (
    profile.fullName ||
    profile.name ||
    profile.username ||
    profile.email ||
    "N/A"
  );
};

// ============================
// FORMAT CURRENCY
// ============================

export const formatAmount = (amount) => {
  if (amount == null) return "₹0";
  return `₹${Number(amount).toLocaleString("en-IN")}`;
};
