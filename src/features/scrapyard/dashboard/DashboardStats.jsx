const DashboardStats = ({ stats = {} }) => {
  const {
    totalScrapReceived = 0,
    totalScrapSold = 0,
    totalOrders = 0,
    totalRevenue = 0,
  } = stats;

  const cards = [
    {
      title: "Total Scrap Received",
      value: `${Number(totalScrapReceived).toLocaleString()} kg`,
      icon: "⚖️",
      color: "#16a34a",
      bg: "#dcfce7",
    },
    {
      title: "Scrap Sold",
      value: `${Number(totalScrapSold).toLocaleString()} kg`,
      icon: "📦",
      color: "#2563eb",
      bg: "#dbeafe",
    },
    {
      title: "Orders Received",
      value: Number(totalOrders).toLocaleString(),
      icon: "🛒",
      color: "#ea580c",
      bg: "#ffedd5",
    },
    {
      title: "Revenue Collected",
      value: `₹${Number(totalRevenue).toLocaleString()}`,
      icon: "💰",
      color: "#9333ea",
      bg: "#f3e8ff",
    },
  ];

  return (
    <div className="sd-stats-grid">
      {cards.map((card) => (
        <div key={card.title} className="sd-stat-card">
          <div className="sd-stat-top" style={{ background: card.color }} />

          <div
            className="sd-stat-icon"
            style={{ background: card.bg, color: card.color }}
          >
            {card.icon}
          </div>

          <p className="sd-stat-title">{card.title}</p>

          <h2 className="sd-stat-value">{card.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
