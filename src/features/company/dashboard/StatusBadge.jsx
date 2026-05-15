import { getStatusColor } from "../utils/getStatusColor";

const StatusBadge = ({ status }) => {
  return (
    <span
      style={{
        padding: "6px 12px",
        borderRadius: "20px",
        background: getStatusColor(status),
        color: "white",
        fontSize: "12px",
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
