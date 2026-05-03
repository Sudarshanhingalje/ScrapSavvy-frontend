import { useEffect, useState } from "react";
import CustomerSidebar from "../Common/CustomerSidebar";

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "orange";
    case "ACCEPTED":
      return "blue";
    case "COMPLETED":
      return "green";
    case "REJECTED":
      return "red";
    default:
      return "gray";
  }
};

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      setOrders([]);
      return;
    }

    fetch("http://localhost:8080/api/scrap-orders/my-orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        console.log("Orders:", data);

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

    // AUTO REFRESH
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex">
      {/* SIDEBAR */}
      <CustomerSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 p-4">
        <div className="container-fluid">
          <h2 className="mb-2">📦 Scrap Sale History</h2>
          <p className="text-muted">Track your order status</p>
          <hr />

          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <div className="row">
              {orders.map((order) => (
                <div className="col-md-4 mb-3" key={order.id}>
                  <div className="card shadow-sm p-3 h-100">
                    {/* CUSTOMER NAME */}
                    <h5 className="mb-2">{order.customerName}</h5>

                    {/* DETAILS */}
                    <p>
                      <b>Scrap Type:</b> {order.scrapType}
                    </p>
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
                      <b>Date:</b>{" "}
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "—"}
                    </p>

                    {/* STATUS */}
                    <div className="mt-auto">
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
