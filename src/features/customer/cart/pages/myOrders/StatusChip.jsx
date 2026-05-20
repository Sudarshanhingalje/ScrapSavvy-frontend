// src/features/customer/cart/components/myOrders/StatusChip.jsx

import { getStatusConfig } from "../../utils/myOrderHelpers";

const StatusChip = ({ status }) => {
  const config = getStatusConfig(status);
  return (
    <span className={config.chipClass}>
      <span className={config.dotClass}></span>
      {config.label}
    </span>
  );
};

export default StatusChip;
