const InventorySummary = ({ inventory }) => {
  const total = inventory.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0,
  );

  return (
    <div className="sd-card">
      <h2 className="sd-card-title">🗃️ Inventory Summary</h2>

      <div className="sd-inv-list">
        {inventory.map((item) => (
          <div key={item.materialType} className="sd-inv-row">
            <div>
              <h3 className="sd-inv-mat">{item.materialType}</h3>
            </div>

            <div className="sd-inv-qty-bold">{item.quantity} kg</div>
          </div>
        ))}
      </div>

      <div className="sd-inv-total">
        <span>Total</span>
        <span>{total} kg</span>
      </div>
    </div>
  );
};

export default InventorySummary;
