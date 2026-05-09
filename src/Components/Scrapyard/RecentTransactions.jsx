import ScrapyardSidebar from "../Common/ScrapyardSidebar";

const RecentTransactions = ({ transactions = [] }) => {
  return (
    <div className="card mt-3">
      <ScrapyardSidebar />
      <div className="card-body">
        <h5>Recent Transactions</h5>

        {(Array.isArray(transactions) ? transactions : [])
          .slice(0, 5)
          .map((tx) => (
            <div
              key={tx.id}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #eee",
                fontSize: "13px",
              }}
            >
              <div style={{ fontWeight: 600 }}>
                {tx.type === "ADD"
                  ? "🟢 Stock Added"
                  : tx.type === "REMOVE"
                    ? "🔴 Stock Sold"
                    : "⚪ Activity"}
              </div>

              <div>Material: {tx.materialType}</div>
              <div>Quantity: {tx.quantity} kg</div>
              <div>Price: ₹{tx.pricePerKg || 0}/kg</div>

              <div style={{ color: "#666" }}>
                Source: {tx.source || "-"} | Ref: {tx.referenceId || "-"}
              </div>

              <div style={{ fontSize: "12px", color: "#999" }}>
                {tx.createdAt
                  ? new Date(tx.createdAt).toLocaleString()
                  : "No Date"}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
