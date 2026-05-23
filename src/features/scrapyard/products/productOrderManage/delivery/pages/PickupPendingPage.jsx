import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchDeliveries } from "../redux/deliveryThunk";
import "../styles/DeliveryManagement.css";

import ScrapyardSidebar from "../../../../../../shared/layout/ScrapyardSidebar";
import DeliveryCard from "../components/DeliveryCard";

const PickupPendingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deliveries, loading, error } = useSelector((state) => state.delivery);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  const filtered = deliveries.filter(
    (d) => d.deliveryStatus === "PICKUP_PENDING",
  );

  return (
    <div className="delivery-layout">
      <ScrapyardSidebar />

      <div className="delivery-management-container">
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
          ← Back
        </button>

        <h1 className="delivery-management-title">📦 Pickup Pending Orders</h1>

        <div
          style={{
            background: "#fef9c3",
            border: "1px solid #fde047",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "14px",
            color: "#854d0e",
            marginBottom: "20px",
            fontWeight: "500",
          }}
        >
          These orders are confirmed and waiting to be picked up by a delivery
          agent.
        </div>

        {loading && <div className="delivery-empty">⏳ Loading orders...</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="delivery-empty">
            <div className="delivery-empty-icon">✅</div>
            <div>No orders pending pickup right now</div>
          </div>
        )}

        {!loading && (
          <div className="delivery-grid">
            {filtered.map((delivery) => (
              <DeliveryCard
                key={delivery.orderId}
                delivery={delivery}
                onViewDetails={(id) => navigate(`/scrapyard/delivery/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupPendingPage;
