const LowStockAlert = ({ inventory }) => {
  const lowStock = inventory.filter((item) => item.quantity < 30);

  if (lowStock.length === 0) {
    return null;
  }

  return (
    <div className="sd-alert">
      <h2 className="sd-alert-title">⚠️ Low Stock Alert</h2>

      <div className="sd-alert-list">
        {lowStock.map((item) => (
          <div key={item.materialType} className="sd-alert-row">
            <span className="sd-alert-mat">{item.materialType}</span>

            <span className="sd-alert-qty">{item.quantity} kg</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlert;
