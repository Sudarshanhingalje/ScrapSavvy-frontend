import React from "react";

const OrderStatsBar = ({ orders }) => {
  const total = orders?.length ?? 0;
  const pending =
    orders?.filter((o) => o.orderStatus === "PENDING").length ?? 0;
  const inTransit =
    orders?.filter((o) =>
      ["ACCEPTED", "PACKED", "SHIPPED"].includes(o.orderStatus),
    ).length ?? 0;
  const delivered =
    orders?.filter((o) => o.orderStatus === "DELIVERED").length ?? 0;
  const cancelled =
    orders?.filter((o) => o.orderStatus === "CANCELLED").length ?? 0;

  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-label">All orders</span>
        <span className="stat-value">{total}</span>
      </div>

      <div className="stat-item">
        <span className="stat-label">Pending</span>
        <span className="stat-value pending">{pending}</span>
      </div>

      <div className="stat-item">
        <span className="stat-label">In transit</span>
        <span className="stat-value transit">{inTransit}</span>
      </div>

      <div className="stat-item">
        <span className="stat-label">Delivered</span>
        <span className="stat-value delivered">{delivered}</span>
      </div>

      <div className="stat-item">
        <span className="stat-label">Cancelled</span>
        <span className="stat-value cancelled">{cancelled}</span>
      </div>
    </div>
  );
};

export default OrderStatsBar;
