const TrackingIdBadge = ({ trackingId }) => {
  return (
    <div
      style={{
        background: "#f1f5f9",
        border: "1px solid #e2e8f0",
        padding: "6px 14px",
        borderRadius: "8px",
        fontWeight: "700",
        fontSize: "13px",
        display: "inline-block",
        color: "#0f172a",
        fontFamily: "monospace",
        letterSpacing: "0.05em",
      }}
    >
      🔖 {trackingId || "N/A"}
    </div>
  );
};

export default TrackingIdBadge;
