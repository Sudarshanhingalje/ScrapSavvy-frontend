import api from "../../cart/api/api";

const BASE = "/reviews";

// Customer: submit review
export const submitReview = (userProfileId, payload) =>
  api.post(`${BASE}?userProfileId=${userProfileId}`, payload);

// Product reviews
export const getProductReviews = (productId) =>
  api.get(`${BASE}/product/${productId}`);

// Customer reviews
export const getMyReviews = (userProfileId) =>
  api.get(`${BASE}/my/${userProfileId}`);

// Owner reviews
export const getOwnerReviews = (ownerProfileId) =>
  api.get(`${BASE}/owner/${ownerProfileId}`);

// Check already reviewed
export const checkReviewed = (orderId, productId) =>
  api.get(`${BASE}/check`, {
    params: { orderId, productId },
  });
