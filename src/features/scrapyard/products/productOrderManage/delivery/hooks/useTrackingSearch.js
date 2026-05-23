import { useMemo } from "react";

const useTrackingSearch = (deliveries, searchTerm) => {
  return useMemo(() => {
    if (!Array.isArray(deliveries)) return [];

    if (!searchTerm || !searchTerm.trim()) return deliveries;

    const q = searchTerm.toLowerCase().trim();

    return deliveries.filter((delivery) => {
      const trackingId = delivery?.trackingId?.toLowerCase() || "";
      const orderId = String(delivery?.orderId || "");
      const customerName = (
        delivery?.userProfile?.fullName ||
        delivery?.userProfile?.name ||
        delivery?.userProfile?.username ||
        ""
      ).toLowerCase();

      return (
        trackingId.includes(q) ||
        orderId.includes(q) ||
        customerName.includes(q)
      );
    });
  }, [deliveries, searchTerm]);
};

export default useTrackingSearch;
