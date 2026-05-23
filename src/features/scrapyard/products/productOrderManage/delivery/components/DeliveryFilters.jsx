import "../styles/DeliveryFilters.css";

const FILTERS = [
  { key: "ALL", label: "All" },
  { key: "PICKUP_PENDING", label: "Pickup Pending" },
  { key: "PICKED_UP", label: "Picked Up" },
  { key: "IN_TRANSIT", label: "In Transit" },
  { key: "OUT_FOR_DELIVERY", label: "Out For Delivery" },
  { key: "DELIVERED", label: "Delivered" },
  { key: "FAILED", label: "Failed" },
];

const ACTIVE_CLASS_MAP = {
  DELIVERED: "active-delivered",
  FAILED: "active-failed",
  PICKUP_PENDING: "active-pending",
};

const DeliveryFilters = ({ selectedFilter, setSelectedFilter }) => {
  return (
    <div className="delivery-filters">
      {FILTERS.map((filter) => {
        const isActive = selectedFilter === filter.key;
        const activeClass = isActive
          ? ACTIVE_CLASS_MAP[filter.key] || "active"
          : "";

        return (
          <button
            key={filter.key}
            className={`delivery-filter-btn ${activeClass}`}
            onClick={() => setSelectedFilter(filter.key)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default DeliveryFilters;
