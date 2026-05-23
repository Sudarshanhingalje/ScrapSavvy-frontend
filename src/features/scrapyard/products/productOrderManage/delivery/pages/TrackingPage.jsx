// ==============================
// FILE: TrackingPage.jsx
// ==============================

import { useParams } from "react-router-dom";

const TrackingPage = () => {
  const { trackingId } = useParams();

  return (
    <div style={{ padding: "24px" }}>
      <h1>Tracking Page</h1>

      <h2>Tracking ID: {trackingId}</h2>
    </div>
  );
};

export default TrackingPage;
