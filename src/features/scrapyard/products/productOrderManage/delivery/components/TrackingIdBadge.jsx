const TrackingIdBadge = ({ trackingId }) => {
  return (
    <div
      style={{
        background: "#f1f5f9",
        padding: "8px 14px",
        borderRadius: "8px",
        fontWeight: "600",
        display: "inline-block",
      }}
    >
      {trackingId}
    </div>
  );
};

export default TrackingIdBadge;
