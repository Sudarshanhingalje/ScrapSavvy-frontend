// ==============================
// FILE: DeliveryDetailsPage.jsx
// ==============================

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchDeliveryById, updateStatus } from "../redux/deliveryThunk";

import DeliveryTimeline from "../components/DeliveryTimeline";
import DriverInfoCard from "../components/DriverInfoCard";
import OutForDeliveryButton from "../components/OutForDeliveryButton";
import TrackingStatusBadge from "../components/TrackingStatusBadge";

const DeliveryDetailsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { selectedDelivery, loading, error } = useSelector(
    (state) => state.delivery,
  );

  useEffect(() => {
    dispatch(fetchDeliveryById(id));
  }, [dispatch, id]);

  const handleDelivered = () => {
    dispatch(
      updateStatus({
        id,
        status: "DELIVERED",
      }),
    );
  };

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  if (error) {
    return <h2 style={{ padding: "20px", color: "red" }}>{error}</h2>;
  }

  if (!selectedDelivery) {
    return <h2 style={{ padding: "20px" }}>Delivery not found</h2>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "10px 16px",
          border: "none",
          background: "#111827",
          color: "#fff",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Back
      </button>

      <h1>Delivery Details</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2>Order #{selectedDelivery.orderId}</h2>

        <p>
          <strong>Tracking ID:</strong> {selectedDelivery.trackingId}
        </p>

        <p>
          <strong>Total Amount:</strong> ₹{selectedDelivery.totalAmount}
        </p>

        <TrackingStatusBadge status={selectedDelivery.deliveryStatus} />

        <DriverInfoCard delivery={selectedDelivery} />

        <DeliveryTimeline status={selectedDelivery.deliveryStatus} />

        <div style={{ marginTop: "20px" }}>
          <OutForDeliveryButton
            currentStatus={selectedDelivery.deliveryStatus}
            onClick={() =>
              dispatch(
                updateStatus({
                  id,
                  status: "OUT_FOR_DELIVERY",
                }),
              )
            }
          />
        </div>

        <button
          onClick={handleDelivered}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            background: "green",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Mark Delivered
        </button>
      </div>
    </div>
  );
};

export default DeliveryDetailsPage;
