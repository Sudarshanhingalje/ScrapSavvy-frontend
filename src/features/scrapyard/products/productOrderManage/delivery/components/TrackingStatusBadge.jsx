// ==============================
// FILE: TrackingStatusBadge.jsx
// ==============================

const TrackingStatusBadge = ({ status }) => {
  return (
    <div
      style={{
        display: "inline-block",
        padding: "8px 14px",
        borderRadius: "20px",
        background: "#2563eb",
        color: "#fff",
        marginTop: "10px",
      }}
    >
      {status}
    </div>
  );
};

export default TrackingStatusBadge;
