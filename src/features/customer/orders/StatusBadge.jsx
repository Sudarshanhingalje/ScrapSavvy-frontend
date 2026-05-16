import { STATUS_META, getStatusIcon } from "../constants/orderStatus";

const StatusBadge = ({ status }) => {
  return (
    <span className={`co-status-badge co-status-badge--${status}`}>
      {getStatusIcon(status)} {STATUS_META[status]?.label ?? status}
    </span>
  );
};

export default StatusBadge;
