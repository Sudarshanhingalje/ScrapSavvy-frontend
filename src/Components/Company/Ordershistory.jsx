import { useEffect, useState } from "react";
import CompanySidebar from "../Common/CompanySidebar";
import { generateInvoice } from "../Common/Invoice";
import Razorpay from "../Common/Razorpay";

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "#f0ad4e";
    case "ACCEPTED":
      return "#0275d8";
    case "SCHEDULED":
      return "#f39c12";
    case "OUT_FOR_DELIVERY":
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

  const updateStatus = (id, status) => {
    const token = localStorage.getItem("token");

    return fetch(
      `http://localhost:8080/api/scrap-orders/${id}/status?status=${status}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Status update failed");
        return res.json();
      })
      .then(() => fetchOrders())
      .catch((err) => console.error(err));
  };
  const handleCash = (order) => {
    updatePayment(order.id, "COD", "PENDING", order.totalPrice);
    updateStatus(order.id, "COMPLETED");
  };

  const handleUPI = (order) => {
    const upiId = "sudarshanhingalje1-1@oksbi"; // ✅ correct
    const amount = order.totalPrice;

    const upiUrl = `upi://pay?pa=${upiId}&pn=ScrapSavvy&am=${amount}&cu=INR`;

    window.location.href = upiUrl;

    // ✅ set payment method as UPI but not paid yet
    updatePayment(order.id, "UPI", "PENDING", order.totalPrice);
  };

  const handleRazorpay = async (order) => {
    try {
      const paymentId = await Razorpay(order.totalPrice);

      updatePayment(order.id, "RAZORPAY", "PAID", order.totalPrice, paymentId);
    } catch (err) {
      console.error(err);
    }
  };

  const updatePayment = (id, method, status, amount, paymentId = "") => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/scrap-orders/${id}/payment-success`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        paymentMethod: method,
        paymentStatus: status,
        paidAmount: amount,
        paymentId: paymentId,
      }),
    }).then(() => fetchOrders());
  };
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

        return res.text(); // ✅ no await
      })
      .then((text) => {
        const data = text ? JSON.parse(text) : [];

        const safeData = Array.isArray(data)
          ? data
          : Array.isArray(data?.orders)
            ? data.orders
            : [];

        setOrders(safeData);
      })
      .catch((err) => {
        console.error(err);
        setOrders([]);
      });
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
    "OUT_FOR_DELIVERY",
    "COMPLETED",
  ];

  const getStepIndex = (status) => {
    return steps.indexOf(status);
  };

  return (
    <div className="d-flex">
      <CompanySidebar />

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
                      {order.status === "OUT_FOR_DELIVERY" && (
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
                      {/* ================= PAYMENT SECTION ================= */}
                      {order.status === "OUT_FOR_DELIVERY" && (
                        <>
                          <hr />

                          <p>
                            <b>Payment Method:</b>{" "}
                            {order.paymentMethod || "Not Selected"}
                          </p>
                          <p>
                            <b>Payment Status:</b>{" "}
                            {order.paymentStatus || "PENDING"}
                          </p>

                          {/* PAYMENT BUTTONS */}
                          {order.paymentStatus !== "PAID" && (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "6px",
                                  flexWrap: "wrap",
                                }}
                              >
                                <button
                                  className="btn btn-dark btn-sm"
                                  onClick={() => handleCash(order)}
                                >
                                  Cash 💵
                                </button>

                                <button
                                  className="btn btn-info btn-sm"
                                  onClick={() => handleUPI(order)}
                                >
                                  UPI 📲
                                </button>

                                <button
                                  className="btn btn-warning btn-sm"
                                  onClick={() => handleRazorpay(order)}
                                >
                                  Pay Online 💳
                                </button>
                              </div>

                              {/* ✅ ADD THIS HERE */}
                              {order.paymentMethod === "UPI" && (
                                <button
                                  className="btn btn-success btn-sm mt-2"
                                  onClick={() => {
                                    updatePayment(
                                      order.id,
                                      "UPI",
                                      "PAID",
                                      order.totalPrice,
                                    );
                                  }}
                                >
                                  I Have Paid ✅
                                </button>
                              )}
                            </>
                          )}

                          {/* PAID STATUS */}
                          {order.paymentStatus === "PAID" && (
                            <p style={{ color: "green", fontWeight: "bold" }}>
                              ✔ Payment Successful
                            </p>
                          )}
                        </>
                      )}
                      {/* STATUS BADGE ONLY */}
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        {/* Left: Status */}
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

                        {/* Middle gap (optional visual spacing) */}
                        <div style={{ width: "10px" }}></div>

                        {/* Right: Button */}
                        {order.status?.toUpperCase() === "COMPLETED" && (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => generateInvoice(order)}
                          >
                            📄 Download Invoice
                          </button>
                        )}
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
