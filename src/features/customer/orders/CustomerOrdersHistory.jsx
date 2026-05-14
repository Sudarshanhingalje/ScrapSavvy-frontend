import { useEffect, useState } from "react";
import { generateCustomerInvoice } from "../../../features/customer/pages/CustomerInvoice";
import CustomerSidebar from "../../../shared/layout/CustomerSidebar";
import "../../customer/styles/CustomerOrdersHistory.css";

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

const STATUS_META = {
  PENDING: { dot: "#f59e0b", label: "Pending", icon: "🕐" },
  ACCEPTED: { dot: "#3b82f6", label: "Accepted", icon: "✅" },
  SCHEDULED: { dot: "#f97316", label: "Scheduled", icon: "📅" },
  OUT_FOR_PICKUP: { dot: "#06b6d4", label: "Out for Pickup", icon: "🚚" },
  COMPLETED: { dot: "#16a34a", label: "Completed", icon: "🎉" },
  REJECTED: { dot: "#ef4444", label: "Rejected", icon: "❌" },
};

const getStatusDot = (status) => STATUS_META[status]?.dot ?? "#9ca3af";
const getStatusIcon = (status) => STATUS_META[status]?.icon ?? "•";

const steps = [
  "PENDING",
  "ACCEPTED",
  "SCHEDULED",
  "OUT_FOR_PICKUP",
  "COMPLETED",
];

const getStepIndex = (status) => steps.indexOf(status);

const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

const StatusBadge = ({ status }) => (
  <span className={`co-status-badge co-status-badge--${status}`}>
    {getStatusIcon(status)} {STATUS_META[status]?.label ?? status}
  </span>
);

const InfoItem = ({ label, value, highlight = false, full = false }) => (
  <div className={`co-info-item${full ? " co-info-item--full" : ""}`}>
    <span className="co-info-item__label">{label}</span>
    <span
      className={`co-info-item__value${highlight ? " co-info-item__value--highlight" : ""}`}
    >
      {value}
    </span>
  </div>
);

const PaymentRow = ({ method, paymentStatus }) => {
  const badge = paymentStatus?.toUpperCase() ?? "PENDING";
  return (
    <div className="co-payment-row">
      <span className="co-payment-row__label">💳 {method || "—"}</span>
      <span className={`co-payment-badge co-payment-badge--${badge}`}>
        {badge}
      </span>
    </div>
  );
};

const DriverBanner = ({ driverName, driverContact }) => (
  <div className="co-driver-banner">
    <span className="co-driver-banner__icon">🚚</span>
    <div>
      <p className="co-driver-banner__title">Driver is on the way!</p>
      <div className="co-driver-banner__details">
        <span>
          <b>Name:</b> {driverName || "Not Assigned"}
        </span>
        <span>
          <b>Contact:</b> {driverContact || "Not Available"}
        </span>
      </div>
    </div>
  </div>
);

const Stepper = ({ currentStep }) => (
  <div className="co-tracking">
    <p className="co-tracking__title">Live Tracking</p>
    <div className="co-stepper">
      {steps.map((step, index) => {
        const done = currentStep >= index;
        return (
          <div key={step} className={`co-step${done ? " co-step--done" : ""}`}>
            <div className="co-step__dot">
              {done && <span className="co-step__check">✓</span>}
            </div>
            <span className="co-step__label">{step.replace(/_/g, " ")}</span>
          </div>
        );
      })}
    </div>
  </div>
);

const OrderCard = ({ order }) => {
  const currentStep = getStepIndex(order.status);
  const accentColor = getStatusDot(order.status);

  return (
    <div className="co-order-card">
      {/* <CustomerSidebar /> */}
      {/* coloured top accent */}
      <div
        className="co-order-card__accent"
        style={{ background: accentColor }}
      />

      <div className="co-order-card__body">
        {/* Header */}
        <div className="co-order-card__header">
          <div>
            <p className="co-order-card__id">Order #{order.id}</p>
            <h3 className="co-order-card__scrap-type">{order.scrapType}</h3>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Key metrics */}
        <div className="co-info-grid">
          <InfoItem
            label="Total Quantity"
            value={`${order.quantity} KG`}
            highlight
          />
          <InfoItem
            label="Total Amount"
            value={`₹${order.totalPrice || 0}`}
            highlight
          />
          <InfoItem label="Order Date" value={formatDate(order.createdAt)} />
          <InfoItem label="Pickup Date" value={order.pickupDate || "—"} />
          <InfoItem label="Pickup Time" value={order.pickupTime || "—"} />
          <InfoItem label="Contact" value={order.contactNo || "—"} />
          <InfoItem label="Address" value={order.pickupAddress || "—"} full />
        </div>

        <hr className="co-card-divider" />

        {/* Driver info when out for pickup */}
        {order.status === "OUT_FOR_PICKUP" && (
          <>
            <DriverBanner
              driverName={order.assignedDriver}
              driverContact={order.driverContactNo}
            />
            <hr className="co-card-divider" />
          </>
        )}

        {/* Payment */}
        <PaymentRow
          method={order.paymentMethod}
          paymentStatus={order.paymentStatus}
        />

        <hr className="co-card-divider" />

        {/* Stepper */}
        <Stepper currentStep={currentStep} />

        {/* Invoice download — only when COMPLETED */}
        {order.status?.toUpperCase() === "COMPLETED" && (
          <>
            <hr className="co-card-divider" />
            <button
              className="co-invoice-btn"
              onClick={() => generateCustomerInvoice(order)}
            >
              📄 Download Invoice
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main page component
───────────────────────────────────────────── */

const CustomerOrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!customerId) {
      setLoading(false);
      return;
    }

    const fetchOrders = () => {
      fetch(`http://localhost:8080/api/customer-sell/customer/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          const text = await res.text();
          return text ? JSON.parse(text) : [];
        })
        .then((data) => {
          setOrders(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error(err);
          setOrders([]);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="co-layout">
      <CustomerSidebar />

      <div className="co-main">
        {/* Page header */}
        <div className="co-page-header">
          <h2 className="co-page-header__title">📦 Track Scrap Orders</h2>
          <p className="co-page-header__subtitle">
            Track your scrap pickup requests
          </p>
          <hr className="co-page-header__divider" />
        </div>

        {/* Loading */}
        {loading && (
          <div className="co-state">
            <div className="co-spinner" />
            <p className="co-state__title">Loading Orders...</p>
            <p className="co-state__text">
              Fetching your latest scrap requests
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && orders.length === 0 && (
          <div className="co-state">
            <div className="co-state__icon">📭</div>
            <h4 className="co-state__title">No Scrap Orders Yet</h4>
            <p className="co-state__text">
              Your submitted scrap requests will appear here
            </p>
          </div>
        )}

        {/* Orders grid */}
        {!loading && orders.length > 0 && (
          <div className="co-orders-grid">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrdersHistory;
