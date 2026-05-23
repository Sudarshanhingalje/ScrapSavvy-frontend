import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchDeliveries, updateStatus } from "../redux/deliveryThunk";
import "../styles/DeliveryManagement.css";

import ScrapyardSidebar from "../../../../../../shared/layout/ScrapyardSidebar";
import DeliveryCard from "../components/DeliveryCard";

const OutForDeliveryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deliveries, loading, error } = useSelector((state) => state.delivery);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  const filtered = deliveries.filter(
    (d) => d.deliveryStatus === "OUT_FOR_DELIVERY",
  );

  const handleMarkDelivered = (orderId) => {
    if (window.confirm("Mark this order as Delivered?")) {
      dispatch(updateStatus({ id: orderId, status: "DELIVERED" }));
    }
  };

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

        <h1 className="delivery-management-title">🏃 Out For Delivery</h1>

        <div
          style={{
            background: "#ffedd5",
            border: "1px solid #fb923c",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "14px",
            color: "#9a3412",
            marginBottom: "20px",
            fontWeight: "500",
          }}
        >
          {filtered.length} order(s) are out for delivery. Mark them delivered
          once completed.
        </div>

        {loading && <div className="delivery-empty">⏳ Loading orders...</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="delivery-empty">
            <div className="delivery-empty-icon">📭</div>
            <div>No orders out for delivery right now</div>
          </div>
        )}

        {!loading && (
          <div className="delivery-grid">
            {filtered.map((delivery) => (
              <div key={delivery.orderId}>
                <DeliveryCard
                  delivery={delivery}
                  onViewDetails={(id) => navigate(`/scrapyard/delivery/${id}`)}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "-12px",
                    marginBottom: "16px",
                    paddingLeft: "4px",
                  }}
                >
                  <button
                    onClick={() => handleMarkDelivered(delivery.orderId)}
                    style={{
                      padding: "8px 16px",
                      background: "#16a34a",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "13px",
                    }}
                  >
                    ✅ Mark Delivered
                  </button>

                  {delivery.driverPhone && (
                    <a
                      href={`tel:${delivery.driverPhone}`}
                      style={{
                        padding: "8px 16px",
                        background: "#f1f5f9",
                        color: "#374151",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontSize: "13px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      📞 Call Driver
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutForDeliveryPage;
