const useDeliveryFilters = (deliveries, selectedFilter) => {
  if (!deliveries) return [];

  if (selectedFilter === "ALL") {
    return deliveries;
  }

  return deliveries.filter(
    (delivery) =>
      delivery.deliveryStatus && delivery.deliveryStatus === selectedFilter,
  );
};

export default useDeliveryFilters;
