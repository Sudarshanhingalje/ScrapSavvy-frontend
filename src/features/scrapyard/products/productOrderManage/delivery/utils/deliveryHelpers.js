export const formatDeliveryDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString();
};
