import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchTrackingByTrackingId } from "../redux/deliveryThunk";
import "../styles/TrackingPage.css";

import DeliveryStatusBadge from "../components/DeliveryStatusBadge";
import EstimatedDeliveryCard from "../components/EstimatedDeliveryCard";
import TrackingIdBadge from "../components/TrackingIdBadge";
import TrackingTimeline from "../components/TrackingTimeline";
import { formatDeliveryDate, getCustomerName } from "../utils/deliveryHelpers";

const TrackingPage = () => {
  const { trackingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { trackingResult, trackingLoading, trackingError } = useSelector(
    (state) => state.delivery,
  );

  useEffect(() => {
    if (trackingId) {
      dispatch(fetchTrackingByTrackingId(trackingId));
    }
  }, [dispatch, trackingId]);

  if (trackingLoading) {
    return (
      <div className="tracking-page">
        <div className="tracking-page-inner">
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: "#64748b",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>⏳</div>
            <div style={{ fontSize: "16px" }}>Loading tracking details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (trackingError || !trackingResult) {
    return (
      <div className="tracking-page">
        <div className="tracking-page-inner">
          <button
            className="tracking-page-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <div className="tracking-page-error">
            <div className="tracking-page-error-icon">🔍</div>
            <div className="tracking-page-error-text">
              Tracking ID not found
            </div>
            <p style={{ color: "#64748b", marginTop: "8px", fontSize: "14px" }}>
              No delivery found for: <strong>{trackingId}</strong>
            </p>
            <button
              onClick={() => navigate("/tracking-search")}
              style={{
                marginTop: "16px",
                padding: "10px 20px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Search Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const order = trackingResult;
  const customerName = getCustomerName(order);

  return (
    <div className="tracking-page">
      <div className="tracking-page-inner">
        {/* BACK */}
        <button className="tracking-page-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* TITLE */}
        <div className="tracking-page-title">Track Your Order</div>
        <div className="tracking-page-subtitle">
          Order #{order.orderId} · {customerName}
        </div>

        {/* TRACKING ID + STATUS */}
        <div className="tracking-page-card">
          <div className="tracking-page-card-title">Tracking Info</div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            <TrackingIdBadge trackingId={order.trackingId} />
            <DeliveryStatusBadge status={order.deliveryStatus} />
          </div>

          <div className="tracking-page-info-row">
            <span className="tracking-page-info-label">Order ID</span>
            <span className="tracking-page-info-value">#{order.orderId}</span>
          </div>

          <div className="tracking-page-info-row">
            <span className="tracking-page-info-label">Order Amount</span>
            <span className="tracking-page-info-value">
              ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="tracking-page-info-row">
            <span className="tracking-page-info-label">Order Date</span>
            <span className="tracking-page-info-value">
              {formatDeliveryDate(order.createdAt)}
            </span>
          </div>
        </div>

        {/* ESTIMATED DELIVERY */}
        <EstimatedDeliveryCard estimatedDelivery={order.estimatedDelivery} />

        {/* TIMELINE */}
        <div className="tracking-page-card" style={{ marginTop: "16px" }}>
          <TrackingTimeline currentStatus={order.deliveryStatus} />
        </div>

        {/* DRIVER INFO (only show name + partner, not phone for privacy) */}
        {order.driverName && (
          <div className="tracking-page-card" style={{ marginTop: "16px" }}>
            <div className="tracking-page-card-title">Delivery Agent</div>

            <div className="tracking-page-info-row">
              <span className="tracking-page-info-label">Name</span>
              <span className="tracking-page-info-value">
                {order.driverName}
              </span>
            </div>

            <div className="tracking-page-info-row">
              <span className="tracking-page-info-label">Partner</span>
              <span className="tracking-page-info-value">
                {order.deliveryPartner || "N/A"}
              </span>
            </div>

            <div className="tracking-page-info-row">
              <span className="tracking-page-info-label">Vehicle</span>
              <span className="tracking-page-info-value">
                {order.vehicleNumber || "N/A"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
