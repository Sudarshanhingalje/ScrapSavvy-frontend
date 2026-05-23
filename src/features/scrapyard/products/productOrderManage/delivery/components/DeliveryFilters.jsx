const DeliveryFilters = ({ selectedFilter, setSelectedFilter }) => {
  const filters = [
    "ALL",
    "PICKUP_PENDING",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "FAILED",
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setSelectedFilter(filter)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            background: selectedFilter === filter ? "#2563eb" : "#fff",
            color: selectedFilter === filter ? "#fff" : "#000",
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default DeliveryFilters;
