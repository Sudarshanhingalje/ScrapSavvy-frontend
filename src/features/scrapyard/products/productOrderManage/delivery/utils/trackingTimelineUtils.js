export const trackingTimelineSteps = [
  "PICKUP_PENDING",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export const formatTrackingId = (id) => {
  return `TRK-2026-${String(id).padStart(5, "0")}`;
};
