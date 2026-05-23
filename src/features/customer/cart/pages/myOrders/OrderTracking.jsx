// src/features/customer/cart/pages/myOrders/OrderTracking.jsx

import axios from "axios";
import { useEffect, useState } from "react";

// ── Order-level steps (shown when NOT yet shipped) ──────────────────────────
const ORDER_STEPS = [
  { key: "PENDING", icon: "⏳", label: "Pending" },
  { key: "ACCEPTED", icon: "✅", label: "Accepted" },
  { key: "PACKED", icon: "📦", label: "Packed" },
  { key: "SHIPPED", icon: "🚚", label: "Shipped" },
  { key: "DELIVERED", icon: "🏠", label: "Delivered" },
];

// ── Delivery-level steps (shown once order is SHIPPED / DELIVERED) ───────────
const DELIVERY_STEPS = [
  { key: "PICKUP_PENDING", icon: "📦", label: "Pickup Pending" },
  { key: "PICKED_UP", icon: "🚚", label: "Picked Up" },
  { key: "IN_TRANSIT", icon: "🛣️", label: "In Transit" },
  { key: "OUT_FOR_DELIVERY", icon: "🏃", label: "Out For Delivery" },
  { key: "DELIVERED", icon: "✅", label: "Delivered" },
];

// ── Statuses that warrant fetching delivery tracking ─────────────────────────
const SHIPPED_STATUSES = new Set(["SHIPPED", "DELIVERED"]);

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
};

// ── Simple order-status stepper (pre-ship) ───────────────────────────────────
const SimpleTimeline = ({ currentStatus }) => {
  const currentIndex = ORDER_STEPS.findIndex((s) => s.key === currentStatus);

  return (
    <div className="tracking-panel">
      <div className="tracking-title">Shipment Timeline</div>
      <div className="steps-row">
        {ORDER_STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="step-wrap">
              {index < ORDER_STEPS.length - 1 && (
                <div
                  className={`connector ${
                    isDone
                      ? "connector-done"
                      : isCurrent
                        ? "connector-active"
                        : ""
                  }`}
                />
              )}
              <div
                className={`step-circle ${
                  isCurrent
                    ? "step-current"
                    : isDone
                      ? "step-done"
                      : "step-pending"
                }`}
              >
                <span className="step-icon">{step.icon}</span>
              </div>
              <div
                className={`step-label ${
                  isCurrent ? "label-current" : isDone ? "label-done" : ""
                }`}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Full ecommerce-style tracking panel (post-ship) ──────────────────────────
const FullTrackingPanel = ({ delivery }) => {
  const currentIndex = DELIVERY_STEPS.findIndex(
    (s) => s.key === delivery.deliveryStatus,
  );

  return (
    <div className="tracking-panel" style={{ padding: "20px 24px" }}>
      {/* ── Tracking Info Card ── */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#64748b",
            marginBottom: "10px",
          }}
        >
          Tracking Info
        </div>

        {/* Tracking ID badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            padding: "6px 12px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#1d4ed8",
            marginBottom: "12px",
          }}
        >
          🔖 {delivery.trackingId}
        </div>

        {/* Status badge */}
        <div style={{ marginBottom: "12px" }}>
          <span
            style={{
              background:
                delivery.deliveryStatus === "DELIVERED" ? "#dcfce7" : "#fef9c3",
              color:
                delivery.deliveryStatus === "DELIVERED" ? "#14532d" : "#854d0e",
              border: `1px solid ${delivery.deliveryStatus === "DELIVERED" ? "#4ade80" : "#fde047"}`,
              borderRadius: "8px",
              padding: "4px 10px",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {delivery.deliveryStatus?.replace(/_/g, " ")}
          </span>
        </div>

        {/* Info rows */}
        {[
          ["Order ID", `#${delivery.orderId}`],
          [
            "Order Amount",
            `₹${Number(delivery.totalAmount || 0).toLocaleString("en-IN")}`,
          ],
          ["Order Date", formatDate(delivery.createdAt)],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 0",
              borderBottom: "1px solid #f1f5f9",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#64748b" }}>{label}</span>
            <span style={{ fontWeight: 600, color: "#0f172a" }}>{value}</span>
          </div>
        ))}

        {/* Expected delivery */}
        {delivery.estimatedDelivery && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "10px",
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "13px",
              color: "#166534",
              fontWeight: 600,
            }}
          >
            📅 <span>Expected By</span>
            <span style={{ marginLeft: "auto" }}>
              {formatDate(delivery.estimatedDelivery)}
            </span>
          </div>
        )}
      </div>

      {/* ── Shipment Timeline ── */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#64748b",
            marginBottom: "14px",
          }}
        >
          Shipment Timeline
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {DELIVERY_STEPS.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isPending = index > currentIndex;
            const isLast = index === DELIVERY_STEPS.length - 1;

            return (
              <div
                key={step.key}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                {/* Dot + connector */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: "24px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 800,
                      background: isCompleted
                        ? "#16a34a"
                        : isCurrent
                          ? "#2563eb"
                          : "#e2e8f0",
                      color: isCompleted || isCurrent ? "#fff" : "#94a3b8",
                      border: isCurrent ? "2px solid #93c5fd" : "none",
                      flexShrink: 0,
                    }}
                  >
                    {isCompleted ? "✓" : isCurrent ? "●" : index + 1}
                  </div>
                  {!isLast && (
                    <div
                      style={{
                        width: "2px",
                        height: "28px",
                        background: isCompleted ? "#16a34a" : "#e2e8f0",
                        margin: "2px 0",
                      }}
                    />
                  )}
                </div>

                {/* Label */}
                <div style={{ paddingBottom: isLast ? 0 : "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      fontWeight: isCurrent ? 700 : isCompleted ? 600 : 400,
                      color: isCompleted
                        ? "#16a34a"
                        : isCurrent
                          ? "#2563eb"
                          : "#94a3b8",
                    }}
                  >
                    <span>{step.icon}</span>
                    {step.label}
                  </div>
                  {isCurrent && (
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#2563eb",
                        marginTop: "2px",
                      }}
                    >
                      ● Current Status
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Delivery Agent ── */}
      {delivery.driverName && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "16px 20px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#64748b",
              marginBottom: "10px",
            }}
          >
            Delivery Agent
          </div>

          {[
            ["Name", delivery.driverName],
            ["Partner", delivery.deliveryPartner || "N/A"],
            ["Vehicle", delivery.vehicleNumber || "N/A"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: "1px solid #f1f5f9",
                fontSize: "13px",
              }}
            >
              <span style={{ color: "#64748b" }}>{label}</span>
              <span style={{ fontWeight: 600, color: "#0f172a" }}>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const OrderTracking = ({ currentStatus, orderId }) => {
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const needsDeliveryTracking = SHIPPED_STATUSES.has(
    currentStatus?.toUpperCase(),
  );

  useEffect(() => {
    if (!needsDeliveryTracking || !orderId) return;

    setLoading(true);
    setFetchError(null);

    // Fetch delivery info by orderId from the delivery endpoint
    axios
      .get(`http://localhost:8080/api/delivery/${orderId}`)
      .then((res) => {
        setDelivery(res.data);
      })
      .catch(() => {
        // Fallback: search all deliveries for this orderId
        axios
          .get("http://localhost:8080/api/delivery")
          .then((res) => {
            const found = res.data.find(
              (d) => String(d.orderId) === String(orderId),
            );
            if (found) {
              setDelivery(found);
            } else {
              setFetchError("Delivery tracking not available yet.");
            }
          })
          .catch(() => setFetchError("Could not load tracking details."));
      })
      .finally(() => setLoading(false));
  }, [orderId, needsDeliveryTracking]);

  // Pre-ship: show simple order stepper
  if (!needsDeliveryTracking) {
    return <SimpleTimeline currentStatus={currentStatus} />;
  }

  // Post-ship: show full delivery tracking
  if (loading) {
    return (
      <div
        className="tracking-panel"
        style={{ textAlign: "center", padding: "24px", color: "#64748b" }}
      >
        ⏳ Loading tracking details...
      </div>
    );
  }

  if (fetchError || !delivery) {
    return (
      <div className="tracking-panel">
        {/* Still show the order stepper as fallback */}
        <SimpleTimeline currentStatus={currentStatus} />
        {fetchError && (
          <div
            style={{
              padding: "8px 0",
              fontSize: "13px",
              color: "#64748b",
              textAlign: "center",
            }}
          >
            {fetchError}
          </div>
        )}
      </div>
    );
  }

  return <FullTrackingPanel delivery={delivery} />;
};

export default OrderTracking;
