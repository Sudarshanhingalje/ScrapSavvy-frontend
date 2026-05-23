// ============================
// FORMAT TRACKING ID
// ============================

export const formatTrackingId = (id) => {
  if (!id) return "N/A";
  return id;
};

// ============================
// TRACKING TIMELINE STEPS
// ============================

export const trackingTimelineSteps = [
  { key: "PICKUP_PENDING", label: "Order Ready for Pickup", icon: "📦" },
  { key: "PICKED_UP", label: "Picked Up", icon: "🚚" },
  { key: "IN_TRANSIT", label: "In Transit", icon: "🛣️" },
  { key: "OUT_FOR_DELIVERY", label: "Out For Delivery", icon: "🏃" },
  { key: "DELIVERED", label: "Delivered", icon: "✅" },
];

// ============================
// GET CURRENT STEP INDEX
// ============================

export const getTrackingStepIndex = (status) => {
  return trackingTimelineSteps.findIndex((s) => s.key === status);
};
