export const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "#f0ad4e";

    case "ACCEPTED":
      return "#0275d8";

    case "SCHEDULED":
      return "#f39c12";

    case "OUT_FOR_PICKUP":
      return "#17a2b8";

    case "COMPLETED":
      return "#5cb85c";

    case "REJECTED":
      return "#d9534f";

    default:
      return "gray";
  }
};
