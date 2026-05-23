import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchDeliveries } from "../redux/deliveryThunk";
import "../styles/DeliveryManagement.css";

import ScrapyardSidebar from "../../../../../../shared/layout/ScrapyardSidebar";
import DeliveryCard from "../components/DeliveryCard";

const FailedDeliveriesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deliveries, loading, error } = useSelector((state) => state.delivery);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  const filtered = deliveries.filter((d) => d.deliveryStatus === "FAILED");

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

        <h1 className="delivery-management-title">❌ Failed Deliveries</h1>

        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #fca5a5",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "14px",
            color: "#991b1b",
            marginBottom: "20px",
            fontWeight: "500",
          }}
        >
          {filtered.length} delivery attempt(s) failed and need attention.
        </div>

        {loading && (
          <div className="delivery-empty">⏳ Loading deliveries...</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="delivery-empty">
            <div className="delivery-empty-icon">✅</div>
            <div>No failed deliveries — all good!</div>
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

export default FailedDeliveriesPage;
