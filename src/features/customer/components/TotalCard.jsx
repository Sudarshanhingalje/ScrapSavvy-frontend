const TotalCard = ({ grandTotal, submitOrder, loading }) => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Total Amount: ₹{grandTotal}</h4>

        <button
          className="btn btn-success btn-lg"
          onClick={submitOrder}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Sell Request"}
        </button>
      </div>
    </div>
  );
};

export default TotalCard;
