const useTrackingSearch = (deliveries, searchTerm) => {
  if (!searchTerm) {
    return deliveries;
  }

  return deliveries.filter((delivery) =>
    delivery?.trackingId?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );
};

export default useTrackingSearch;
