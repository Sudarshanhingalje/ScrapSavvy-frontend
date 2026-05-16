const SellItemsCard = ({
  items,
  rates,
  handleItemChange,
  addItem,
  removeItem,
}) => {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <h5 className="mb-3">Scrap Materials</h5>

        {items.map((item, index) => (
          <div key={index} className="row g-3 align-items-end mb-3">
            <div className="col-md-3">
              <label className="form-label">Material</label>

              <select
                className="form-select"
                value={item.materialType}
                onChange={(e) =>
                  handleItemChange(index, "materialType", e.target.value)
                }
              >
                <option value="">Select</option>

                {Object.keys(rates).map((mat) => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="form-label">Quantity (kg)</label>

              <input
                type="number"
                min="1"
                className="form-control"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Price/kg</label>

              <input
                type="text"
                className="form-control"
                value={`₹${item.pricePerKg}`}
                disabled
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Total</label>

              <input
                type="text"
                className="form-control"
                value={`₹${item.total}`}
                disabled
              />
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-danger w-100"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button className="btn btn-success" onClick={addItem}>
          + Add More Material
        </button>
      </div>
    </div>
  );
};

export default SellItemsCard;
