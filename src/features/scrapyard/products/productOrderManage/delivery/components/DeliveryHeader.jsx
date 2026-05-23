import "../styles/DeliveryHeader.css";

const DeliveryHeader = ({ deliveries }) => {
  const total = deliveries?.length || 0;

  const delivered =
    deliveries?.filter((d) => d.deliveryStatus === "DELIVERED").length || 0;

  const failed =
    deliveries?.filter((d) => d.deliveryStatus === "FAILED").length || 0;

  const active =
    deliveries?.filter(
      (d) => d.deliveryStatus !== "DELIVERED" && d.deliveryStatus !== "FAILED",
    ).length || 0;

  const outForDelivery =
    deliveries?.filter((d) => d.deliveryStatus === "OUT_FOR_DELIVERY").length ||
    0;

  const stats = [
    { icon: "📦", label: "Total Deliveries", value: total, cls: "" },
    { icon: "🚚", label: "Active", value: active, cls: "blue" },
    { icon: "✅", label: "Delivered", value: delivered, cls: "green" },
    {
      icon: "🏃",
      label: "Out For Delivery",
      value: outForDelivery,
      cls: "orange",
    },
    { icon: "❌", label: "Failed", value: failed, cls: "red" },
  ];

  return (
    <div className="delivery-header-grid">
      {stats.map((stat) => (
        <div className="delivery-stat-card" key={stat.label}>
          <div className="delivery-stat-card-icon">{stat.icon}</div>
          <div className="delivery-stat-card-label">{stat.label}</div>
          <div className={`delivery-stat-card-value ${stat.cls}`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryHeader;
