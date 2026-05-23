const DeliveryStatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "DELIVERED":
        return "#16a34a";

      case "OUT_FOR_DELIVERY":
        return "#ea580c";

      case "IN_TRANSIT":
        return "#2563eb";

      case "FAILED":
        return "#dc2626";

      default:
        return "#64748b";
    }
  };

  return (
    <span
      style={{
        backgroundColor: getStatusColor(),
        color: "#fff",
        padding: "6px 12px",
        borderRadius: "8px",
        fontSize: "12px",
        fontWeight: "600",
      }}
    >
      {status}
    </span>
  );
};

export default DeliveryStatusBadge;
