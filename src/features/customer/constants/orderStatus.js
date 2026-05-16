export const STATUS_META = {
  PENDING: {
    dot: "#f59e0b",
    label: "Pending",
    icon: "🕐",
  },

  ACCEPTED: {
    dot: "#3b82f6",
    label: "Accepted",
    icon: "✅",
  },

  SCHEDULED: {
    dot: "#f97316",
    label: "Scheduled",
    icon: "📅",
  },

  OUT_FOR_PICKUP: {
    dot: "#06b6d4",
    label: "Out for Pickup",
    icon: "🚚",
  },

  COMPLETED: {
    dot: "#16a34a",
    label: "Completed",
    icon: "🎉",
  },

  REJECTED: {
    dot: "#ef4444",
    label: "Rejected",
    icon: "❌",
  },
};

export const steps = [
  "PENDING",
  "ACCEPTED",
  "SCHEDULED",
  "OUT_FOR_PICKUP",
  "COMPLETED",
];

export const getStatusDot = (status) => STATUS_META[status]?.dot ?? "#9ca3af";

export const getStatusIcon = (status) => STATUS_META[status]?.icon ?? "•";

export const getStepIndex = (status) => steps.indexOf(status);
