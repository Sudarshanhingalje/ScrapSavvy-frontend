import { useEffect, useState } from "react";
import { generateCustomerInvoice } from "../Common/CustomerInvoice";
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

const CustomerOrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
          if (Array.isArray(data)) {
            setOrders(data);
          } else {
            setOrders([]);
          }
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
    <div className="d-flex">
      <CustomerSidebar />

      <div className="flex-grow-1 p-4 bg-light min-vh-100">
        <div className="container-fluid">
          <h2 className="mb-2">📦 My Scrap Orders</h2>

          <p className="text-muted">Track your scrap pickup requests</p>

          <hr />

          {loading ? (
            <div className="text-center mt-5">
              <h5>Loading Orders...</h5>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center mt-5">
              <h4>No Scrap Orders Yet</h4>

              <p className="text-muted">
                Your submitted scrap requests will appear here
              </p>
            </div>
          ) : (
            <div className="row">
              {orders.map((order) => {
                const currentStep = getStepIndex(order.status);

                return (
                  <div className="col-md-6 mb-4" key={order.id}>
                    <div className="card shadow-sm border-0 h-100">
                      <div className="card-body">
                        {/* HEADER */}
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">
                            #{order.id} - {order.scrapType}
                          </h5>

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

                        <hr />

                        {/* DETAILS */}
                        <p>
                          <b>Total Quantity:</b> {order.quantity} KG
                        </p>

                        <p>
                          <b>Total Amount:</b> ₹{order.totalPrice || 0}
                        </p>

                        <p>
                          <b>Order Date:</b> {formatDate(order.createdAt)}
                        </p>

                        <p>
                          <b>Pickup Date:</b> {order.pickupDate || "—"}
                        </p>

                        <p>
                          <b>Pickup Time:</b> {order.pickupTime || "—"}
                        </p>

                        <p>
                          <b>Contact:</b> {order.contactNo || "—"}
                        </p>

                        <p>
                          <b>Address:</b> {order.pickupAddress || "—"}
                        </p>

                        {/* DRIVER */}
                        {order.status === "OUT_FOR_PICKUP" && (
                          <>
                            <hr />

                            <p
                              style={{
                                color: "#17a2b8",
                                fontWeight: "600",
                              }}
                            >
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

                        {/* PAYMENT */}
                        <hr />

                        <p>
                          <b>Payment Method:</b> {order.paymentMethod || "—"}
                        </p>

                        <p>
                          <b>Payment Status:</b>{" "}
                          {order.paymentStatus || "PENDING"}
                        </p>

                        {/* TRACKING */}
                        <div className="mt-3">
                          <b>Live Tracking:</b>

                          <div
                            style={{
                              marginTop: "8px",
                              fontSize: "13px",
                            }}
                          >
                            {steps.map((step, index) => {
                              const isActive = currentStep >= index;

                              return (
                                <div
                                  key={step}
                                  style={{
                                    marginBottom: "4px",
                                  }}
                                >
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

                        {/* INVOICE */}
                        {order.status?.toUpperCase() === "COMPLETED" && (
                          <div className="mt-3">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => generateCustomerInvoice(order)}
                            >
                              📄 Download Invoice
                            </button>
                          </div>
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

export default CustomerOrdersHistory;
