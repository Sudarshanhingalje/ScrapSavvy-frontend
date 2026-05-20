// src/features/customer/cart/utils/myOrderConstants.js

export const ORDER_STATUS = {
  DELIVERED: "DELIVERED",
  SHIPPED: "SHIPPED",
  PROCESSING: "PROCESSING",
  CANCELLED: "CANCELLED",
};

export const STATUS_CONFIG = {
  DELIVERED: {
    label: "Delivered",
    chipClass: "status-chip status-delivered",
    dotClass: "status-dot dot-delivered",
  },
  SHIPPED: {
    label: "Shipped",
    chipClass: "status-chip status-shipped",
    dotClass: "status-dot dot-shipped",
  },
  PROCESSING: {
    label: "Processing",
    chipClass: "status-chip status-processing",
    dotClass: "status-dot dot-processing",
  },
  CANCELLED: {
    label: "Cancelled",
    chipClass: "status-chip status-cancelled",
    dotClass: "status-dot dot-cancelled",
  },
};

export const PAYMENT_STATUS = {
  PAID: "PAID",
  PENDING: "PENDING",
  COD: "COD",
};

export const BUTTON_CONFIG = {
  DELIVERED: ["rateReview", "trackOrder", "buyAgain"],
  SHIPPED: ["cancelOrder", "trackOrder", "buyAgain"],
  PROCESSING: ["cancelOrder", "trackOrder", "buyAgain"],
  CANCELLED: ["buyAgain"],
};
