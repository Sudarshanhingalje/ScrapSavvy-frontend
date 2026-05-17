import { useSelector } from "react-redux";

const PriceCards = () => {
  const prices = useSelector((state) => state.scrapRates.data);

  const items = [
    { name: "Metal", icon: "🔩" },
    { name: "Plastic", icon: "🧴" },
    { name: "Paper", icon: "📄" },
    { name: "Glass", icon: "🍾" },
    { name: "Electronics", icon: "💻" },
    { name: "Textiles", icon: "🧵" },
    { name: "Others", icon: "📦" },
  ];

  return (
    <div className="sd-card">
      <h2 className="sd-card-title">📊 Current Scrap Prices</h2>

      <div className="sd-prices-grid">
        {items.map((item) => {
          const data = prices[item.name] || {};

          return (
            <div key={item.name} className="sd-price-item">
              {/* Header */}
              <div className="sd-price-item-header">
                <span className="sd-price-icon">{item.icon}</span>
                <h3 className="sd-price-mat-name">{item.name}</h3>
              </div>

              {/* Customer Price */}
              <div className="sd-price-row">
                <span className="sd-price-label">Customer</span>
                <span className="sd-price-value sd-price-value--green">
                  ₹{data.customerPrice ?? "--"} /kg
                </span>
              </div>

              {/* Company Price */}
              <div className="sd-price-row">
                <span className="sd-price-label">Company</span>
                <span className="sd-price-value sd-price-value--blue">
                  ₹{data.companyPrice ?? "--"} /kg
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceCards;
