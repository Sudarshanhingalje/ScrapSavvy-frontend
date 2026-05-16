const PriceCards = ({ prices = {} }) => {
  const items = [
    { key: "Metal", icon: "🔩" },
    { key: "Plastic", icon: "🧴" },
    { key: "Paper", icon: "📄" },
    { key: "Glass", icon: "🪟" },
    { key: "Electronics", icon: "💻" },
    { key: "Textiles", icon: "👕" },
    { key: "Others", icon: "♻️" },
  ];

  return (
    <div className="sd-card">
      <h2 className="sd-card-title">📊 Current Scrap Prices</h2>

      <div className="sd-prices-grid">
        {items.map((item) => (
          <div key={item.key} className="sd-price-item">
            <div className="sd-price-item-header">
              <span className="sd-price-icon">{item.icon}</span>
              <h3 className="sd-price-mat-name">{item.key}</h3>
            </div>

            <div className="sd-price-row">
              <span className="sd-price-label">Customer</span>
              <span className="sd-price-value sd-price-value--green">
                ₹{prices[item.key]?.customer ?? "--"}/kg
              </span>
            </div>

            <div className="sd-price-row">
              <span className="sd-price-label">Company</span>
              <span className="sd-price-value sd-price-value--blue">
                ₹{prices[item.key]?.company ?? "--"}/kg
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceCards;
