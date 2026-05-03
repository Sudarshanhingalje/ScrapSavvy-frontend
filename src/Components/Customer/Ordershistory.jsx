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
    case "OUT_FOR_PICKUP":
      return "#17a2b8";
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

  const steps = [
    "PENDING",
    "ACCEPTED",
    "SCHEDULED",
    "OUT_FOR_PICKUP",
    "COMPLETED",
  ];

  const getStepIndex = (status) => {
    return steps.indexOf(status);
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
              {orders.map((order) => {
                const currentStep = getStepIndex(order.status);

                return (
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

                      {/* SCHEDULED DETAILS */}
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
                        </>
                      )}

                      {/* OUT FOR PICKUP DRIVER INFO (ONLY HERE) */}
                      {order.status === "OUT_FOR_PICKUP" && (
                        <>
                          <hr />
                          <p style={{ color: "#17a2b8", fontWeight: "600" }}>
                            🚚 Driver is on the way
                          </p>
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

                      {/* ACCEPTED INFO */}
                      {order.status === "ACCEPTED" && (
                        <>
                          <hr />
                          <p style={{ color: "#0275d8" }}>
                            ✔ Order accepted. Waiting for schedule...
                          </p>
                        </>
                      )}

                      {/* TIMELINE */}
                      <div className="mt-3">
                        <b>Live Tracking:</b>

                        <div style={{ marginTop: "8px", fontSize: "13px" }}>
                          {steps.map((step, index) => {
                            const isActive = currentStep >= index;

                            return (
                              <div key={step} style={{ marginBottom: "4px" }}>
                                <span
                                  style={{
                                    color: isActive ? "green" : "#aaa",
                                    fontWeight: isActive ? "600" : "400",
                                  }}
                                >
                                  {isActive ? "✔" : "○"} {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* STATUS BADGE ONLY */}
                      <div className="mt-auto pt-2">
                        <span
                          style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            background: getStatusColor(order.status),
                            color: "white",
                            fontSize: "12px",
                            display: "inline-block",
                          }}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersHistory;
