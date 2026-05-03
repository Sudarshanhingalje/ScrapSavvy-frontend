import { useEffect, useState } from "react";
import ScrapyardSidebar from "../Common/ScrapyardSidebar";

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "#fd7e14";
    case "ACCEPTED":
      return "#0d6efd";
    case "COMPLETED":
      return "#198754";
    case "REJECTED":
      return "#dc3545";
    default:
      return "#6c757d";
  }
};

const ScrapOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const [scheduleData, setScheduleData] = useState({
    pickupDate: "",
    pickupTime: "",
    assignedDriver: "",
    driverContactNo: "",
  });
  const fetchOrders = () => {
    fetch("http://localhost:8080/api/scrap-orders/all")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const clearOrder = (id) => {
    fetch(`http://localhost:8080/api/scrap-orders/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        return res.text();
      })
      .then(() => setOrders((prev) => prev.filter((o) => o.id !== id)))
      .catch((err) => console.error(err));
  };

  const updateStatus = (id, status) => {
    const token = localStorage.getItem("token");

    fetch(
      `http://localhost:8080/api/scrap-orders/${id}/status?status=${status}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update status");
        return res.json();
      })
      .then(() => fetchOrders())
      .catch((err) => console.error(err));
  };

  const filteredOrders =
    filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  const filterBtns = [
    { label: "All", value: "ALL", cls: "btn-secondary" },
    { label: "Pending", value: "PENDING", cls: "btn-warning" },
    { label: "Accepted", value: "ACCEPTED", cls: "btn-primary" },
    { label: "Completed", value: "COMPLETED", cls: "btn-success" },
    { label: "Rejected", value: "REJECTED", cls: "btn-danger" },
  ];

  const scheduleOrder = () => {
    const token = localStorage.getItem("token");

    fetch(
      `http://localhost:8080/api/scrap-orders/${selectedOrder.id}/schedule`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(scheduleData),
      },
    )
      .then((res) => res.json())
      .then(() => {
        setShowSchedule(false);
        setSelectedOrder(null);
        fetchOrders();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* ── SIDEBAR ── */}
      <ScrapyardSidebar />

      {/* ── PAGE BODY ── */}
      <div style={{ flex: 1, padding: "24px 20px", overflowX: "hidden" }}>
        {/* ── ROW 1 : Title ── */}
        <h1 className="dashboard-title" style={{ margin: "0 0 4px 0" }}>
          📦 Scrap Orders
        </h1>
        <hr style={{ margin: "10px 0 14px" }} />

        {/* ── ROW 2 : Subtitle LEFT | Filter Buttons RIGHT ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
            Live customer scrap orders
          </p>

          <div style={{ display: "flex", gap: "6px", flexWrap: "nowrap" }}>
            {filterBtns.map(({ label, value, cls }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`btn ${cls} btn-sm`}
                style={{
                  whiteSpace: "nowrap",
                  fontWeight: filter === value ? "700" : "400",
                  opacity: filter === value ? 1 : 0.7,
                  boxShadow:
                    filter === value ? "0 0 0 2px rgba(0,0,0,0.22)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── ROW 3 : Cards LEFT | Table RIGHT ── */}
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          {/* ====== LEFT — SCROLLABLE CARD COLUMN ====== */}
          <div
            style={{
              width: "300px",
              flexShrink: 0,
              height: "75vh" /* fixed height so scroll works */,
              overflowY: "scroll" /* always show scrollbar */,
              overflowX: "hidden",
              paddingRight: "6px",
              paddingBottom: "10px",
            }}
          >
            {orders.length === 0 && (
              <p style={{ color: "#888", fontSize: "13px" }}>No orders yet.</p>
            )}

            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: "#fff",
                  border: "1px solid #dee2e6",
                  borderRadius: "10px",
                  padding: "14px 14px 12px",
                  marginBottom: "14px",
                  /* NO overflow:hidden here — avoids clipping */
                }}
              >
                {/* ── Name + Delete button ── */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <h6
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "#212529",
                    }}
                  >
                    customer name - {order.customerName}
                  </h6>
                  <button
                    onClick={() => clearOrder(order.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#dc3545",
                      fontSize: "16px",
                      lineHeight: 1,
                      padding: 0,
                      marginLeft: "8px",
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* ── ALL Fields ── */}
                <p style={{ margin: "5px 0", fontSize: "13px", color: "#333" }}>
                  <b>Type:</b> {order.scrapType}
                </p>
                <p style={{ margin: "5px 0", fontSize: "13px", color: "#333" }}>
                  <b>Qty:</b> {order.quantity} kg
                </p>
                <p style={{ margin: "5px 0", fontSize: "13px", color: "#333" }}>
                  <b>Total:</b> ₹{order.totalPrice}
                </p>
                <p style={{ margin: "5px 0", fontSize: "13px", color: "#333" }}>
                  <b>Address:</b> {order.pickupAddress}
                </p>
                <p style={{ margin: "5px 0", fontSize: "13px", color: "#333" }}>
                  <b>Contact No:</b> {order.contactNo}
                </p>
                <p style={{ margin: "5px 0", fontSize: "13px", color: "#333" }}>
                  <b>Order Date:</b>{" "}
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </p>

                {/* ── Status Badge ── */}
                <div style={{ margin: "10px 0 10px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      background: getStatusColor(order.status),
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {order.status}
                  </span>
                </div>

                {/* ── Action Buttons ── */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {order.status === "PENDING" && (
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          updateStatus(order.id, "ACCEPTED");
                          setSelectedOrder(order);
                          setShowSchedule(true);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateStatus(order.id, "REJECTED")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {order.status === "ACCEPTED" && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => updateStatus(order.id, "COMPLETED")}
                    >
                      Complete
                    </button>
                  )}
                  {order.status === "COMPLETED" && (
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#198754",
                        fontWeight: 600,
                      }}
                    >
                      ✔ Done
                    </span>
                  )}
                  {order.status === "REJECTED" && (
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#dc3545",
                        fontWeight: 600,
                      }}
                    >
                      ✖ Rejected
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* ====== END LEFT ====== */}

          {/* ====== RIGHT — TABLE ====== */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                background: "#fff",
                border: "1px solid #dee2e6",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <h5 style={{ margin: "0 0 4px 0" }}>📋 Orders Received</h5>

              {filteredOrders.length === 0 ? (
                <p
                  style={{ color: "#888", fontSize: "13px", marginTop: "10px" }}
                >
                  No orders found for selected filter.
                </p>
              ) : (
                <div className="table-responsive">
                  <table
                    className="table table-bordered table-hover mt-3"
                    style={{ fontSize: "13px" }}
                  >
                    <thead className="table-light">
                      <tr>
                        <th>Customer</th>
                        <th>Scrap Type</th>
                        <th>Qty</th>
                        <th>Price/kg</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.customerName}</td>
                          <td>{order.scrapType}</td>
                          <td>{order.quantity}</td>
                          <td>₹{order.pricePerKg}</td>
                          <td>₹{order.totalPrice}</td>
                          <td>
                            <span
                              style={{
                                display: "inline-block",
                                padding: "3px 10px",
                                borderRadius: "20px",
                                color: "#fff",
                                fontSize: "11px",
                                fontWeight: 600,
                                background: getStatusColor(order.status),
                              }}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {order.status === "PENDING" && (
                              <>
                                <button
                                  className="btn btn-success btn-sm me-1"
                                  onClick={() => {
                                    updateStatus(order.id, "ACCEPTED");
                                    setTimeout(() => {
                                      setSelectedOrder(order);
                                      setShowSchedule(true);
                                    }, 300);
                                  }}
                                >
                                  Accept
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    updateStatus(order.id, "REJECTED")
                                  }
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {order.status === "ACCEPTED" && (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() =>
                                  updateStatus(order.id, "COMPLETED")
                                }
                              >
                                Complete
                              </button>
                            )}
                            {order.status === "COMPLETED" && (
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#198754",
                                  fontWeight: 600,
                                }}
                              >
                                ✔ Done
                              </span>
                            )}
                            {order.status === "REJECTED" && (
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#dc3545",
                                  fontWeight: 600,
                                }}
                              >
                                ✖ Rejected
                              </span>
                            )}
                            {order.status === "SCHEDULED" && (
                              <button
                                className="btn btn-warning btn-sm"
                                onClick={() =>
                                  updateStatus(order.id, "OUT_FOR_PICKUP")
                                }
                              >
                                Start Pickup 🚚
                              </button>
                            )}
                            {order.status === "OUT_FOR_PICKUP" && (
                              <>
                                <button
                                  className="btn btn-success btn-sm me-1"
                                  onClick={() =>
                                    updateStatus(order.id, "COMPLETED")
                                  }
                                >
                                  Mark Completed ✔
                                </button>

                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    updateStatus(order.id, "REJECTED")
                                  }
                                >
                                  Reject ❌
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          {/* ====== END RIGHT ====== */}
        </div>
        {/* ── END ROW 3 ── */}
      </div>
      {showSchedule && selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "350px",
            }}
          >
            <h5>Schedule Pickup</h5>

            <input
              type="date"
              className="form-control mb-2"
              onChange={(e) =>
                setScheduleData({ ...scheduleData, pickupDate: e.target.value })
              }
            />

            <input
              type="time"
              className="form-control mb-2"
              onChange={(e) =>
                setScheduleData({ ...scheduleData, pickupTime: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Driver Name"
              className="form-control mb-2"
              onChange={(e) =>
                setScheduleData({
                  ...scheduleData,
                  assignedDriver: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Driver Contact"
              className="form-control mb-3"
              onChange={(e) =>
                setScheduleData({
                  ...scheduleData,
                  driverContactNo: e.target.value,
                })
              }
            />

            <button
              className="btn btn-success btn-sm me-2"
              onClick={scheduleOrder}
            >
              Save Schedule
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowSchedule(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrapOrders;
