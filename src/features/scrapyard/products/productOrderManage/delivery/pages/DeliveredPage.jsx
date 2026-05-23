import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchDeliveries } from "../redux/deliveryThunk";
import "../styles/DeliveryManagement.css";

import ScrapyardSidebar from "../../../../../../shared/layout/ScrapyardSidebar";
import DeliveryCard from "../components/DeliveryCard";

const DeliveredPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deliveries, loading, error } = useSelector((state) => state.delivery);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  const filtered = deliveries.filter((d) => d.deliveryStatus === "DELIVERED");

  return (
    <div className="delivery-layout">
      <ScrapyardSidebar />

      <div className="delivery-management-container">
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

        <h1 className="delivery-management-title">📦 Delivered Orders</h1>

        <div
          style={{
            background: "#dcfce7",
            border: "1px solid #86efac",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "14px",
            color: "#166534",
            marginBottom: "20px",
            fontWeight: "500",
          }}
        >
          {filtered.length} order(s) successfully delivered.
        </div>

        {loading && (
          <div className="delivery-empty">⏳ Loading deliveries...</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="delivery-empty">
            <div className="delivery-empty-icon">📭</div>
            <div>No delivered orders yet.</div>
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

export default DeliveredPage;
