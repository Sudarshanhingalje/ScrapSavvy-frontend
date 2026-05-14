import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Razorpay from "../../../shared/components/Razorpay";
import ScrapyardSidebar from "../../../shared/layout/ScrapyardSidebar";

/* ─────────────────────────────────────────────
   Inline styles — no extra CSS file needed
───────────────────────────────────────────── */
const S = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#0f1a0f",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  main: {
    flexGrow: 1,
    padding: "32px 28px",
    background:
      "linear-gradient(145deg, #0f1a0f 0%, #132213 60%, #0e1b10 100%)",
    minHeight: "100vh",
    overflowY: "auto",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 28,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    background: "linear-gradient(135deg, #2E7D32, #FF6F00)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    flexShrink: 0,
    boxShadow: "0 4px 18px rgba(46,125,50,0.45)",
  },
  heading: {
    margin: 0,
    fontSize: 24,
    fontWeight: 800,
    color: "#e8f5e9",
    letterSpacing: "-0.5px",
  },
  subheading: {
    margin: 0,
    fontSize: 12,
    color: "#81C784",
    fontWeight: 500,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  empty: {
    textAlign: "center",
    color: "#4CAF50",
    padding: "60px 0",
    fontSize: 16,
    opacity: 0.6,
  },
  card: {
    background: "linear-gradient(160deg, #1a2e1a 0%, #172717 100%)",
    border: "1px solid rgba(46,125,50,0.3)",
    borderRadius: 18,
    padding: 0,
    marginBottom: 20,
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid rgba(46,125,50,0.2)",
    background: "rgba(46,125,50,0.08)",
  },
  scrapType: {
    fontSize: 17,
    fontWeight: 800,
    color: "#e8f5e9",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  orderId: {
    fontSize: 11,
    color: "#66BB6A",
    fontWeight: 600,
    letterSpacing: 0.8,
    background: "rgba(46,125,50,0.18)",
    padding: "3px 10px",
    borderRadius: 20,
    border: "1px solid rgba(46,125,50,0.3)",
  },
  cardBody: {
    padding: "16px 20px",
  },
  metaRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 14,
  },
  metaChip: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 10,
    padding: "6px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  metaLabel: {
    fontSize: 9,
    color: "#81C784",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  metaValue: {
    fontSize: 14,
    color: "#e8f5e9",
    fontWeight: 700,
  },
  statusBadge: (status) => {
    const map = {
      PENDING: {
        bg: "rgba(255,193,7,0.15)",
        border: "#FFC107",
        color: "#FFD54F",
      },
      ACCEPTED: {
        bg: "rgba(33,150,243,0.15)",
        border: "#2196F3",
        color: "#64B5F6",
      },
      SCHEDULED: {
        bg: "rgba(156,39,176,0.15)",
        border: "#9C27B0",
        color: "#CE93D8",
      },
      OUT_FOR_PICKUP: {
        bg: "rgba(255,111,0,0.15)",
        border: "#FF6F00",
        color: "#FFB74D",
      },
      COMPLETED: {
        bg: "rgba(46,125,50,0.2)",
        border: "#2E7D32",
        color: "#81C784",
      },
      REJECTED: {
        bg: "rgba(211,47,47,0.15)",
        border: "#D32F2F",
        color: "#EF9A9A",
      },
    };
    const t = map[status] || map.PENDING;
    return {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 0.8,
      padding: "4px 12px",
      borderRadius: 20,
      border: `1px solid ${t.border}`,
      background: t.bg,
      color: t.color,
    };
  },
  payBadge: (ps) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: 20,
    border:
      ps === "PAID" ? "1px solid #2E7D32" : "1px solid rgba(255,111,0,0.5)",
    background: ps === "PAID" ? "rgba(46,125,50,0.2)" : "rgba(255,111,0,0.1)",
    color: ps === "PAID" ? "#81C784" : "#FFB74D",
  }),
  imagesRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    margin: "10px 0 14px",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 12,
    objectFit: "cover",
    border: "2px solid rgba(46,125,50,0.35)",
    boxShadow: "0 3px 12px rgba(0,0,0,0.4)",
  },
  actionsRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
    paddingTop: 10,
    borderTop: "1px solid rgba(46,125,50,0.15)",
    marginTop: 4,
  },
  btn: (variant) => {
    const variants = {
      success: {
        bg: "linear-gradient(135deg,#2E7D32,#388E3C)",
        shadow: "rgba(46,125,50,0.4)",
        color: "#fff",
      },
      danger: {
        bg: "linear-gradient(135deg,#b71c1c,#d32f2f)",
        shadow: "rgba(211,47,47,0.4)",
        color: "#fff",
      },
      primary: {
        bg: "linear-gradient(135deg,#1565C0,#1976D2)",
        shadow: "rgba(21,101,192,0.4)",
        color: "#fff",
      },
      warning: {
        bg: "linear-gradient(135deg,#E65100,#FF6F00)",
        shadow: "rgba(255,111,0,0.4)",
        color: "#fff",
      },
      dark: {
        bg: "linear-gradient(135deg,#212121,#37474F)",
        shadow: "rgba(0,0,0,0.4)",
        color: "#fff",
      },
      outline: {
        bg: "transparent",
        shadow: "none",
        color: "#81C784",
        border: "1px solid rgba(46,125,50,0.5)",
      },
    };
    const v = variants[variant] || variants.dark;
    return {
      padding: "8px 18px",
      borderRadius: 10,
      border: v.border || "none",
      background: v.bg,
      color: v.color,
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: `0 3px 12px ${v.shadow}`,
      transition: "transform 0.15s, box-shadow 0.15s",
      letterSpacing: 0.3,
    };
  },
  deleteBtn: {
    marginLeft: "auto",
    width: 32,
    height: 32,
    borderRadius: 8,
    border: "1px solid rgba(211,47,47,0.4)",
    background: "rgba(211,47,47,0.1)",
    color: "#EF9A9A",
    fontSize: 15,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.15s, color 0.15s",
    title: "Delete Order",
  },
  paidBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 14,
    fontWeight: 800,
    color: "#66BB6A",
  },
  payBox: {
    width: "100%",
    marginTop: 6,
    background: "rgba(0,0,0,0.25)",
    border: "1px solid rgba(46,125,50,0.2)",
    borderRadius: 14,
    padding: "14px 16px",
  },
  payTitle: {
    fontSize: 13,
    fontWeight: 800,
    color: "#FFB74D",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  payModeRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  modeBtn: (active, color) => ({
    padding: "6px 16px",
    borderRadius: 10,
    border: active
      ? `1.5px solid ${color}`
      : "1.5px solid rgba(255,255,255,0.12)",
    background: active ? `${color}22` : "rgba(255,255,255,0.04)",
    color: active ? color : "#aaa",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.15s",
  }),
  selectedLabel: {
    fontSize: 12,
    color: "#81C784",
    marginBottom: 10,
  },
  payBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg,#FF6F00,#FF8F00)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(255,111,0,0.4)",
    letterSpacing: 0.5,
  },
  /* ── Modal ── */
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "linear-gradient(160deg,#1a2e1a,#132213)",
    border: "1px solid rgba(46,125,50,0.4)",
    borderRadius: 22,
    padding: 28,
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: 800,
    color: "#e8f5e9",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(46,125,50,0.35)",
    background: "rgba(0,0,0,0.3)",
    color: "#e8f5e9",
    fontSize: 14,
    marginBottom: 12,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  modalBtns: {
    display: "flex",
    gap: 10,
    marginTop: 4,
  },
};

const statusDot = {
  PENDING: "🟡",
  ACCEPTED: "🔵",
  SCHEDULED: "🟣",
  OUT_FOR_PICKUP: "🟠",
  COMPLETED: "🟢",
  REJECTED: "🔴",
};

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const [paymentMode, setPaymentMode] = useState("UPI");

  const [scheduleData, setScheduleData] = useState({
    pickupDate: "",
    pickupTime: "",
    assignedDriver: "",
    driverContactNo: "",
  });

  // ================= FETCH ORDERS =================
  const fetchOrders = () => {
    fetch("http://localhost:8080/api/scrap-orders/customer/all")
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load orders"));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // ================= STATUS UPDATE =================
  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:8080/api/scrap-orders/${id}/status?status=${status}`,
        { method: "PUT", headers: { Authorization: `Bearer ${token}` } },
      );
      const text = await res.text();
      if (!res.ok) {
        toast.error(text);
        return;
      }
      toast.success(`Order ${status}`);
      fetchOrders();
    } catch {
      toast.error("Server error");
    }
  };

  // ================= ACCEPT =================
  const handleAccept = async (order) => {
    await updateStatus(order.id, "ACCEPTED");
    setSelectedOrder(order);
    setShowSchedule(true);
  };

  // ================= SCHEDULE =================
  const scheduleOrder = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:8080/api/scrap-orders/${selectedOrder.id}/schedule`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(scheduleData),
        },
      );
      const text = await res.text();
      if (!res.ok) {
        toast.error(text);
        return;
      }
      toast.success("Pickup Scheduled 🚚");
      setShowSchedule(false);
      setSelectedOrder(null);
      fetchOrders();
    } catch {
      toast.error("Schedule failed");
    }
  };

  // ================= PAYMENT SUCCESS UPDATE =================
  const updatePayment = async (id, method, status, amount, paymentId = "") => {
    const token = localStorage.getItem("token");
    await fetch(
      `http://localhost:8080/api/scrap-orders/${id}/payment-success`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentMethod: method,
          paymentStatus: status,
          paidAmount: amount,
          paymentId,
        }),
      },
    );
    if (status === "PAID") await updateStatus(id, "COMPLETED");
    fetchOrders();
  };

  // ================= CASH PAYMENT =================
  const handleCash = async (order) => {
    await updatePayment(order.id, "CASH", "PAID", order.totalPrice);
    await updateStatus(order.id, "COMPLETED");
    toast.success("Cash Payment Completed 💵");
  };

  // ================= UPI PAYMENT =================
  const handleUPI = (order) => {
    const upiId = "sudarshanhingalje1-1@oksbi";
    const amount = order.totalPrice;
    window.location.href = `upi://pay?pa=${upiId}&pn=ScrapSavvy&am=${amount}&cu=INR`;
    updatePayment(order.id, "UPI", "PENDING", amount);
    toast.info("Complete payment in UPI app, then mark as paid");
  };

  // ================= DELETE ORDER =================
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order permanently?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8080/api/scrap-orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        toast.error("Failed to delete order");
        return;
      }
      toast.success("Order deleted");
      fetchOrders();
    } catch {
      toast.error("Server error");
    }
  };

  // ================= RAZORPAY =================
  const handleRazorpay = async (order) => {
    try {
      const paymentId = await Razorpay(order.totalPrice);
      await updatePayment(
        order.id,
        "RAZORPAY",
        "PAID",
        order.totalPrice,
        paymentId,
      );
      await updateStatus(order.id, "COMPLETED");
      toast.success("Payment Successful 💳");
    } catch {
      toast.error("Payment Failed");
    }
  };

  return (
    <div style={S.page}>
      <ScrapyardSidebar />
      <ToastContainer theme="dark" />

      <div style={S.main}>
        {/* ── Header ── */}
        <div style={S.headerRow}>
          <div style={S.headerIcon}>♻️</div>
          <div>
            <p style={S.subheading}>ScrapSavvy · Owner Panel</p>
            <h2 style={S.heading}>Customer Sell Orders</h2>
          </div>
        </div>

        {orders.length === 0 && (
          <p style={S.empty}>🗃️ No orders found. Waiting for customers…</p>
        )}

        {orders.map((o, idx) => (
          <div
            key={o.id}
            style={{
              ...S.card,
              animationDelay: `${idx * 60}ms`,
            }}
          >
            {/* ── Card Header ── */}
            <div style={S.cardHeader}>
              <div style={S.scrapType}>
                <span>🪙</span>
                {o.scrapType}
              </div>
              <span style={S.orderId}>ORDER #{o.id}</span>
              <button
                style={S.deleteBtn}
                title="Delete Order"
                onClick={() => deleteOrder(o.id)}
              >
                🗑
              </button>
            </div>

            {/* ── Card Body ── */}
            <div style={S.cardBody}>
              {/* Meta chips */}
              <div style={S.metaRow}>
                <div style={S.metaChip}>
                  <span style={S.metaLabel}>Quantity</span>
                  <span style={S.metaValue}>{o.quantity} kg</span>
                </div>
                <div style={S.metaChip}>
                  <span style={S.metaLabel}>Total Price</span>
                  <span style={{ ...S.metaValue, color: "#FFB74D" }}>
                    ₹{o.totalPrice}
                  </span>
                </div>
                <div style={S.metaChip}>
                  <span style={S.metaLabel}>Status</span>
                  <span style={S.statusBadge(o.status)}>
                    {statusDot[o.status] || "⚪"} {o.status}
                  </span>
                </div>
                <div style={S.metaChip}>
                  <span style={S.metaLabel}>Payment</span>
                  <span style={S.payBadge(o.paymentStatus)}>
                    {o.paymentStatus === "PAID"
                      ? "✔ PAID"
                      : `⏳ ${o.paymentStatus || "UNPAID"}`}
                  </span>
                </div>
              </div>

              {/* Scrap Images */}
              {o.images && o.images.length > 0 && (
                <div style={S.imagesRow}>
                  {o.images.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8080${img.imageUrl}`}
                      alt="scrap"
                      style={S.img}
                    />
                  ))}
                </div>
              )}

              {/* ── Actions ── */}
              <div style={S.actionsRow}>
                {o.status === "PENDING" && (
                  <>
                    <button
                      style={S.btn("success")}
                      onClick={() => handleAccept(o)}
                    >
                      ✅ Accept
                    </button>
                    <button
                      style={S.btn("danger")}
                      onClick={() => updateStatus(o.id, "REJECTED")}
                    >
                      ❌ Reject
                    </button>
                  </>
                )}

                {o.status === "ACCEPTED" && (
                  <button
                    style={S.btn("primary")}
                    onClick={() => {
                      setSelectedOrder(o);
                      setShowSchedule(true);
                    }}
                  >
                    📅 Schedule Pickup
                  </button>
                )}

                {o.status === "SCHEDULED" && (
                  <button
                    style={S.btn("warning")}
                    onClick={() => updateStatus(o.id, "OUT_FOR_PICKUP")}
                  >
                    🚚 Start Pickup
                  </button>
                )}

                {o.status === "OUT_FOR_PICKUP" && (
                  <button
                    style={S.btn("success")}
                    onClick={() => updateStatus(o.id, "COMPLETED")}
                  >
                    ✔ Mark Completed
                  </button>
                )}

                {/* ── Payment Panel ── */}
                {(o.status === "OUT_FOR_PICKUP" || o.status === "COMPLETED") &&
                  o.paymentStatus !== "PAID" && (
                    <div style={S.payBox}>
                      <div style={S.payTitle}>💰 Pay Customer</div>

                      <div style={S.payModeRow}>
                        <button
                          style={S.modeBtn(paymentMode === "UPI", "#4FC3F7")}
                          onClick={() => setPaymentMode("UPI")}
                        >
                          📱 UPI
                        </button>
                        <button
                          style={S.modeBtn(paymentMode === "CASH", "#81C784")}
                          onClick={() => setPaymentMode("CASH")}
                        >
                          💵 Cash
                        </button>
                        <button
                          style={S.modeBtn(
                            paymentMode === "RAZORPAY",
                            "#CE93D8",
                          )}
                          onClick={() => setPaymentMode("RAZORPAY")}
                        >
                          💳 Razorpay
                        </button>
                      </div>

                      <div style={S.selectedLabel}>
                        Selected mode: <strong>{paymentMode}</strong>
                      </div>

                      <button
                        style={S.payBtn}
                        onClick={() => {
                          if (paymentMode === "CASH") handleCash(o);
                          if (paymentMode === "UPI") handleUPI(o);
                          if (paymentMode === "RAZORPAY") handleRazorpay(o);
                        }}
                      >
                        💰 Pay Customer Now
                      </button>
                    </div>
                  )}

                {o.paymentStatus === "PAID" && (
                  <span style={S.paidBadge}>✔ Paid</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* ── Schedule Modal ── */}
        {showSchedule && (
          <div style={S.backdrop}>
            <div style={S.modal}>
              <div style={S.modalTitle}>📅 Schedule Pickup</div>

              <input
                type="date"
                style={S.input}
                onChange={(e) =>
                  setScheduleData({
                    ...scheduleData,
                    pickupDate: e.target.value,
                  })
                }
              />

              <input
                type="time"
                style={S.input}
                onChange={(e) =>
                  setScheduleData({
                    ...scheduleData,
                    pickupTime: e.target.value,
                  })
                }
              />

              <input
                type="text"
                style={S.input}
                placeholder="Driver Name"
                onChange={(e) =>
                  setScheduleData({
                    ...scheduleData,
                    assignedDriver: e.target.value,
                  })
                }
              />

              <input
                type="text"
                style={S.input}
                placeholder="Driver Contact"
                onChange={(e) =>
                  setScheduleData({
                    ...scheduleData,
                    driverContactNo: e.target.value,
                  })
                }
              />

              <div style={S.modalBtns}>
                <button
                  style={{ ...S.btn("success"), flex: 1 }}
                  onClick={scheduleOrder}
                >
                  💾 Save Schedule
                </button>
                <button
                  style={{ ...S.btn("outline"), flex: 1 }}
                  onClick={() => setShowSchedule(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
