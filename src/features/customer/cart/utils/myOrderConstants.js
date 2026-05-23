// src/features/customer/cart/utils/myOrderConstants.js

export const ORDER_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  PACKED: "PACKED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  RETURN_REQUESTED: "RETURN_REQUESTED",
  RETURN_APPROVED: "RETURN_APPROVED",
  REFUNDED: "REFUNDED",
};

export const STATUS_CONFIG = {
  PENDING: {
    label: "Pending",
    chipClass: "status-chip status-processing",
    dotClass: "status-dot dot-processing",
  },
  ACCEPTED: {
    label: "Accepted",
    chipClass: "status-chip status-processing",
    dotClass: "status-dot dot-processing",
  },
  PACKED: {
    label: "Packed",
    chipClass: "status-chip status-processing",
    dotClass: "status-dot dot-processing",
  },
  SHIPPED: {
    label: "Shipped",
    chipClass: "status-chip status-shipped",
    dotClass: "status-dot dot-shipped",
  },
  DELIVERED: {
    label: "Delivered",
    chipClass: "status-chip status-delivered",
    dotClass: "status-dot dot-delivered",
  },
  CANCELLED: {
    label: "Cancelled",
    chipClass: "status-chip status-cancelled",
    dotClass: "status-dot dot-cancelled",
  },
  RETURN_REQUESTED: {
    label: "Return Requested",
    chipClass: "status-chip status-processing",
    dotClass: "status-dot dot-processing",
  },
  RETURN_APPROVED: {
    label: "Return Approved",
    chipClass: "status-chip status-shipped",
    dotClass: "status-dot dot-shipped",
  },
  REFUNDED: {
    label: "Refunded",
    chipClass: "status-chip status-delivered",
    dotClass: "status-dot dot-delivered",
  },
};

export const PAYMENT_STATUS = {
  PAID: "PAID",
  PENDING: "PENDING",
  COD: "COD",
};

export const BUTTON_CONFIG = {
  PENDING: ["cancelOrder", "trackOrder"],
  ACCEPTED: ["cancelOrder", "trackOrder"],
  PACKED: ["cancelOrder", "trackOrder"],
  SHIPPED: ["trackOrder"],
  DELIVERED: ["rateReview", "trackOrder", "buyAgain"],
  CANCELLED: ["buyAgain"],
  RETURN_REQUESTED: [],
  RETURN_APPROVED: [],
  REFUNDED: ["buyAgain"],
};
