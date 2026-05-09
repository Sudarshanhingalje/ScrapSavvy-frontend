import { useEffect, useState } from "react";
import CustomerSidebar from "../Common/CustomerSidebar";

const CustomerOrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ CORRECT KEY
    const customerId = localStorage.getItem("userId");

    const token = localStorage.getItem("token");

    if (!customerId) {
      console.error("Customer ID not found");
      setLoading(false);
      return;
    }

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
        console.log("PARSED =", data);

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
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "warning";

      case "ACCEPTED":
        return "primary";

      case "SCHEDULED":
        return "info";

      case "OUT_FOR_PICKUP":
        return "dark";

      case "COMPLETED":
        return "success";

      case "REJECTED":
        return "danger";

      default:
        return "secondary";
    }
  };

  return (
    <div className="d-flex">
      <CustomerSidebar />

      <div className="flex-grow-1 p-4 bg-light min-vh-100">
        <div className="container-fluid">
          <h2 className="mb-2">📦 My Scrap Orders</h2>

          <p className="text-muted">Track your scrap pickup requests</p>

          <hr />

          {/* LOADING */}
          {loading ? (
            <div className="text-center mt-5">
              <h5>Loading Orders...</h5>
            </div>
          ) : orders.length === 0 ? (
            /* EMPTY */
            <div className="text-center mt-5">
              <h4>No Scrap Orders Yet</h4>

              <p className="text-muted">
                Your submitted scrap requests will appear here
              </p>
            </div>
          ) : (
            /* ORDERS */
            <div className="row">
              {orders.map((order) => (
                <div className="col-md-6 mb-4" key={order.id}>
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                          #{order.id} - {order.customerName || "Customer"}
                        </h5>

                        <span
                          className={`badge bg-${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <hr />

                      <p>
                        <strong>Scrap Type:</strong> {order.scrapType}
                      </p>

                      <p>
                        <strong>Total Quantity:</strong> {order.quantity} KG
                      </p>

                      <p>
                        <strong>Total Amount:</strong> ₹{order.totalPrice || 0}
                      </p>

                      <p>
                        <strong>Pickup Date:</strong> {order.pickupDate || "—"}
                      </p>

                      <p>
                        <strong>Pickup Time:</strong> {order.pickupTime || "—"}
                      </p>

                      <p>
                        <strong>Contact:</strong> {order.contactNo || "—"}
                      </p>

                      <p>
                        <strong>Address:</strong> {order.pickupAddress || "—"}
                      </p>

                      <p>
                        <strong>Payment:</strong>{" "}
                        {order.paymentStatus || "PENDING"}
                      </p>

                      <p>
                        <strong>Driver:</strong>{" "}
                        {order.assignedDriver || "Not Assigned"}
                      </p>
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

export default CustomerOrdersHistory;
