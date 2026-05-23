// ============================
// DELIVERY STATUS CONSTANTS
// ============================

export const DELIVERY_STATUS = {
  PICKUP_PENDING: "PICKUP_PENDING",
  PICKED_UP: "PICKED_UP",
  IN_TRANSIT: "IN_TRANSIT",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  FAILED: "FAILED",
  RETURNED: "RETURNED",
};

// ============================
// STATUS COLOR MAP
// ============================

export const DELIVERY_STATUS_COLORS = {
  PICKUP_PENDING: { bg: "#fef9c3", color: "#854d0e", border: "#fde047" },
  PICKED_UP: { bg: "#dbeafe", color: "#1e40af", border: "#93c5fd" },
  IN_TRANSIT: { bg: "#e0f2fe", color: "#075985", border: "#38bdf8" },
  OUT_FOR_DELIVERY: { bg: "#ffedd5", color: "#9a3412", border: "#fb923c" },
  DELIVERED: { bg: "#dcfce7", color: "#14532d", border: "#4ade80" },
  FAILED: { bg: "#fee2e2", color: "#7f1d1d", border: "#f87171" },
  RETURNED: { bg: "#f3e8ff", color: "#581c87", border: "#c084fc" },
};

// ============================
// STATUS LABEL MAP
// ============================

export const DELIVERY_STATUS_LABELS = {
  PICKUP_PENDING: "Pickup Pending",
  PICKED_UP: "Picked Up",
  IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out For Delivery",
  DELIVERED: "Delivered",
  FAILED: "Failed",
  RETURNED: "Returned",
};

// ============================
// TIMELINE STEPS (in order)
// ============================

export const TIMELINE_STEPS = [
  { key: "PICKUP_PENDING", label: "Pickup Pending", icon: "📦" },
  { key: "PICKED_UP", label: "Picked Up", icon: "🚚" },
  { key: "IN_TRANSIT", label: "In Transit", icon: "🛣️" },
  { key: "OUT_FOR_DELIVERY", label: "Out For Delivery", icon: "🏃" },
  { key: "DELIVERED", label: "Delivered", icon: "✅" },
];

// ============================
// GET STEP INDEX
// ============================

export const getStepIndex = (status) => {
  return TIMELINE_STEPS.findIndex((s) => s.key === status);
};
