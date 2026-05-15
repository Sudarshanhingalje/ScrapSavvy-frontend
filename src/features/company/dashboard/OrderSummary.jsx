const OrderSummary = ({
  form = {},
  rates = {},
  total = 0,
  loading = false,
  placeOrder = () => {},
  resetForm = () => {},
}) => {
  const formattedTotal = Number(total || 0).toLocaleString("en-IN");

  const materialRate = rates?.[form?.scrapType]?.companyPrice || 0;

  return (
    <div className="ss-summary">
      <div className="ss-summary-head">
        <h3>Order summary</h3>
        <p>Live price estimate</p>
      </div>

      <div className="ss-summary-body">
        <div className="ss-sum-row">
          <span>Material</span>
          <span>{form?.scrapType || "-"}</span>
        </div>

        <div className="ss-sum-row">
          <span>Quantity</span>
          <span>{form?.quantity ? `${form.quantity} kg` : "— kg"}</span>
        </div>

        <div className="ss-sum-row">
          <span>Rate</span>

          <span className="ss-rate-pill">₹{materialRate} / kg</span>
        </div>

        <div className="ss-total-box">
          <span>Estimated total</span>
          <span className="ss-total-amount">₹{formattedTotal}</span>
        </div>
      </div>

      <div className="ss-summary-actions">
        <button
          className="ss-btn-primary"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? "Placing order…" : "Confirm order"}
        </button>

        <button className="ss-btn-ghost" onClick={resetForm}>
          Clear form
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
