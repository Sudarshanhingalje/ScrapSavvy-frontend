import { useMemo } from "react";

const useTrackingSearch = (deliveries, searchTerm) => {
  return useMemo(() => {
    if (!Array.isArray(deliveries)) {
      return [];
    }

    return deliveries.filter((delivery) => {
      const trackingId = delivery?.trackingId?.toLowerCase() || "";

      return trackingId.includes(searchTerm.toLowerCase());
    });
  }, [deliveries, searchTerm]);
};

export default useTrackingSearch;
