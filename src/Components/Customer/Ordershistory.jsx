import { useEffect, useState } from "react";
import CustomerSidebar from "../Common/CustomerSidebar";

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "#f0ad4e";
    case "ACCEPTED":
      return "#0275d8";
    case "SCHEDULED":
      return "#f39c12";
    case "COMPLETED":
      return "#5cb85c";
    case "REJECTED":
      return "#d9534f";
    default:
      return "gray";
  }
};

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setOrders([]);
      return;
    }

    fetch("http://localhost:8080/api/scrap-orders/my-orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
        return res.json();
      })
      .then((data) => {
        const safeData = Array.isArray(data)
          ? data
          : Array.isArray(data?.orders)
            ? data.orders
            : [];

        setOrders(safeData);
      })
      .catch(() => setOrders([]));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="d-flex">
      <CustomerSidebar />

      <div className="flex-grow-1 p-4">
        <div className="container-fluid">
          <h2 className="mb-2">📦 Scrap Order History</h2>
          <p className="text-muted">Track your orders & pickup status</p>
          <hr />

          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <div className="row">
              {orders.map((order) => (
                <div className="col-md-4 mb-3" key={order.id}>
                  <div className="card shadow-sm p-3 h-100">
                    {/* TITLE */}
                    <h5 className="mb-2">{order.scrapType}</h5>

                    {/* BASIC DETAILS */}
                    <p>
                      <b>Quantity:</b> {order.quantity} kg
                    </p>
                    <p>
                      <b>Total:</b> ₹{order.totalPrice}
                    </p>
                    <p>
                      <b>Contact:</b> {order.contactNo}
                    </p>
                    <p>
                      <b>Order Date:</b> {formatDate(order.createdAt)}
                    </p>

                    {/* PICKUP INFO (SCHEDULED ONLY) */}
                    {order.status === "SCHEDULED" && (
                      <>
                        <hr />
                        <p>
                          <b>Pickup Date:</b> {formatDate(order.pickupDate)}
                        </p>
                        <p>
                          <b>Pickup Time:</b> {order.pickupTime || "—"}
                        </p>
                        <p>
                          <b>Payment Method:</b> {order.paymentMethod || "—"}
                        </p>

                        {/* ✅ DRIVER INFO ADDED */}
                        <p>
                          <b>Driver Name:</b>{" "}
                          {order.assignedDriver || "Not Assigned"}
                        </p>
                        <p>
                          <b>Driver Contact:</b>{" "}
                          {order.driverContactNo || "Not Available"}
                        </p>
                      </>
                    )}

                    {/* ACCEPTED INFO (optional display) */}
                    {order.status === "ACCEPTED" && (
                      <>
                        <hr />
                        <p style={{ color: "#0275d8" }}>
                          ✔ Your order is accepted. Scheduling pending...
                        </p>
                      </>
                    )}

                    {/* TIMELINE */}
                    <div className="mt-3">
                      <b>Status:</b>
                      <div style={{ fontSize: "13px", marginTop: "5px" }}>
                        🟡 Order Placed <br />
                        {order.status !== "PENDING" && "🔵 Accepted"} <br />
                        {order.status === "SCHEDULED" && "🟠 Scheduled"} <br />
                        {order.status === "COMPLETED" && "🟢 Completed"} <br />
                        {order.status === "REJECTED" && "🔴 Rejected"}
                      </div>
                    </div>

                    {/* STATUS BADGE */}
                    <div className="mt-auto pt-2">
                      <span
                        style={{
                          padding: "6px 12px",
                          borderRadius: "20px",
                          background: getStatusColor(order.status),
                          color: "white",
                          fontSize: "12px",
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersHistory;
