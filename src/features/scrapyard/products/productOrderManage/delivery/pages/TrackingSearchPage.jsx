// ==============================
// FILE: TrackingSearchPage.jsx
// ==============================

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TrackingSearchPage = () => {
  const [trackingId, setTrackingId] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!trackingId) return;

    navigate(`/tracking/${trackingId}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Search Tracking</h1>

      <input
        type="text"
        placeholder="Enter Tracking ID"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        style={{
          padding: "12px",
          width: "300px",
          marginRight: "10px",
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          padding: "12px 20px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default TrackingSearchPage;
