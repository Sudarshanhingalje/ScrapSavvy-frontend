import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchDeliveryById } from "../redux/deliveryThunk";

import AssignDriverModal from "../components/AssignDriverModal";
import DeliveryActionButtons from "../components/DeliveryActionButtons";
import DeliveryInfoCard from "../components/DeliveryInfoCard";
import DeliveryTimeline from "../components/DeliveryTimeline";
import DriverInfoCard from "../components/DriverInfoCard";
import EstimatedDeliveryCard from "../components/EstimatedDeliveryCard";
import VehicleInfoCard from "../components/VehicleInfoCard";

import ScrapyardSidebar from "../../../../../../shared/layout/ScrapyardSidebar";

const DeliveryDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedDelivery, loading, error, successMessage } = useSelector(
    (state) => state.delivery,
  );

  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    dispatch(fetchDeliveryById(id));
  }, [dispatch, id]);

  if (loading && !selectedDelivery) {
    return (
      <div style={{ display: "flex" }}>
        <ScrapyardSidebar />
        <div style={{ flex: 1, padding: "40px", marginLeft: "260px" }}>
          <div
            style={{
              textAlign: "center",
              padding: "80px",
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            ⏳ Loading delivery details...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex" }}>
        <ScrapyardSidebar />
        <div style={{ flex: 1, padding: "40px", marginLeft: "260px" }}>
          <div style={{ color: "#dc2626", fontSize: "16px" }}>
            ❌ {typeof error === "object" ? error.message : error}
          </div>
        </div>
      </div>
    );
  }

  if (!selectedDelivery) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      <ScrapyardSidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          marginLeft: "260px",
          maxWidth: "900px",
        }}
      >
        {/* BACK */}
        <button
          onClick={() => navigate("/scrapyard/delivery")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "20px",
            padding: "8px 16px",
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            color: "#374151",
            fontWeight: "500",
          }}
        >
          ← Back to Deliveries
        </button>

        {/* TITLE */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>
            Delivery #{selectedDelivery.orderId}
          </h1>

          {!selectedDelivery.driverName && (
            <button
              onClick={() => setShowAssignModal(true)}
              style={{
                padding: "10px 20px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              🚗 Assign Driver
            </button>
          )}
        </div>

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div
            style={{
              background: "#dcfce7",
              border: "1px solid #4ade80",
              borderRadius: "10px",
              padding: "12px 16px",
              marginBottom: "16px",
              color: "#14532d",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            ✅ {successMessage}
          </div>
        )}

        {/* TWO-COLUMN LAYOUT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <DeliveryInfoCard delivery={selectedDelivery} />
          </div>

          <div>
            <DriverInfoCard delivery={selectedDelivery} />
            <VehicleInfoCard delivery={selectedDelivery} />
          </div>

          <div>
            <EstimatedDeliveryCard
              estimatedDelivery={selectedDelivery.estimatedDelivery}
            />

            {/* TRACKING LINK */}
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #86efac",
                borderRadius: "12px",
                padding: "16px",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#16a34a",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "8px",
                }}
              >
                Tracking Link
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "13px",
                  color: "#0f172a",
                  wordBreak: "break-all",
                }}
              >
                {selectedDelivery.trackingId}
              </div>
              <button
                onClick={() =>
                  navigate(`/tracking/${selectedDelivery.trackingId}`)
                }
                style={{
                  marginTop: "10px",
                  padding: "8px 14px",
                  background: "#16a34a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                View Public Tracking
              </button>
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "24px",
            marginTop: "16px",
          }}
        >
          <DeliveryTimeline status={selectedDelivery.deliveryStatus} />
        </div>

        {/* ACTION BUTTONS */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "24px",
            marginTop: "16px",
          }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: "700",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "12px",
            }}
          >
            Update Delivery Status
          </h3>

          <DeliveryActionButtons
            deliveryId={id}
            currentStatus={selectedDelivery.deliveryStatus}
          />
        </div>
      </div>

      {/* ASSIGN DRIVER MODAL */}
      {showAssignModal && (
        <AssignDriverModal
          orderId={id}
          onClose={() => setShowAssignModal(false)}
          onSuccess={() => dispatch(fetchDeliveryById(id))}
        />
      )}
    </div>
  );
};

export default DeliveryDetailsPage;
