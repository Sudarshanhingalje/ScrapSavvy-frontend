import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Razorpay from "../Common/Razorpay";
import ScrapyardSidebar from "../Common/ScrapyardSidebar";

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
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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
          paymentId: paymentId,
        }),
      },
    );

    // ✅ AUTO RULE: if payment is PAID → mark COMPLETED
    if (status === "PAID") {
      await updateStatus(id, "COMPLETED");
    }

    fetchOrders();
  };

  // ================= CASH PAYMENT =================
  const handleCash = async (order) => {
    await updatePayment(order.id, "CASH", "PAID", order.totalPrice);

    await updateStatus(order.id, "COMPLETED"); // ensure sequence

    toast.success("Cash Payment Completed 💵");
  };

  // ================= UPI PAYMENT =================
  const handleUPI = (order) => {
    const upiId = "sudarshanhingalje1-1@oksbi";
    const amount = order.totalPrice;

    const upiUrl = `upi://pay?pa=${upiId}&pn=ScrapSavvy&am=${amount}&cu=INR`;

    window.location.href = upiUrl;

    // mark as pending
    updatePayment(order.id, "UPI", "PENDING", amount);

    toast.info("Complete payment in UPI app, then mark as paid");
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

      await updateStatus(order.id, "COMPLETED"); // ✔ ensure status update
      toast.success("Payment Successful 💳");
    } catch {
      toast.error("Payment Failed");
    }
  };

  return (
    <div className="d-flex">
      <ScrapyardSidebar />
      <ToastContainer />

      <div className="flex-grow-1 p-4 bg-light min-vh-100">
        <h2>♻️ Customer Sell Orders (Owner Panel)</h2>

        {orders.length === 0 && <p>No orders found</p>}

        {orders.map((o) => (
          <div key={o.id} className="card p-3 mb-3 shadow-sm">
            <b>{o.scrapType}</b>

            <div>{o.quantity} kg</div>
            <div>₹{o.totalPrice}</div>
            <div>Status: {o.status}</div>
            <div>Payment: {o.paymentStatus}</div>

            {/* ================= ACTIONS ================= */}
            <div className="mt-2 d-flex gap-2 flex-wrap">
              {o.status === "PENDING" && (
                <>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAccept(o)}
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => updateStatus(o.id, "REJECTED")}
                  >
                    Reject
                  </button>
                </>
              )}

              {o.status === "ACCEPTED" && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setSelectedOrder(o);
                    setShowSchedule(true);
                  }}
                >
                  Schedule
                </button>
              )}

              {o.status === "SCHEDULED" && (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => updateStatus(o.id, "OUT_FOR_PICKUP")}
                >
                  Start Pickup 🚚
                </button>
              )}

              {o.status === "OUT_FOR_PICKUP" && (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => updateStatus(o.id, "COMPLETED")}
                >
                  Complete ✔
                </button>
              )}

              {/* ================= PAYMENT ================= */}
              {(o.status === "OUT_FOR_PICKUP" || o.status === "COMPLETED") &&
                o.paymentStatus !== "PAID" && (
                  <div className="p-2 border rounded bg-light w-100">
                    <b>💰 Pay Customer</b>

                    <div className="d-flex gap-2 mt-2 flex-wrap">
                      <button
                        className={`btn btn-sm ${
                          paymentMode === "UPI"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setPaymentMode("UPI")}
                      >
                        UPI
                      </button>

                      <button
                        className={`btn btn-sm ${
                          paymentMode === "CASH"
                            ? "btn-success"
                            : "btn-outline-success"
                        }`}
                        onClick={() => setPaymentMode("CASH")}
                      >
                        CASH
                      </button>

                      <button
                        className={`btn btn-sm ${
                          paymentMode === "RAZORPAY"
                            ? "btn-dark"
                            : "btn-outline-dark"
                        }`}
                        onClick={() => setPaymentMode("RAZORPAY")}
                      >
                        Razorpay
                      </button>
                    </div>

                    <div className="mt-2 text-muted">
                      Selected: <b>{paymentMode}</b>
                    </div>

                    <button
                      className="btn btn-dark btn-sm mt-2 w-100"
                      onClick={() => {
                        if (paymentMode === "CASH") handleCash(o);
                        if (paymentMode === "UPI") handleUPI(o);
                        if (paymentMode === "RAZORPAY") handleRazorpay(o);
                      }}
                    >
                      Pay Customer 💰
                    </button>
                  </div>
                )}

              {o.paymentStatus === "PAID" && (
                <span className="text-success fw-bold">✔ Paid</span>
              )}
            </div>
          </div>
        ))}

        {/* ================= SCHEDULE MODAL ================= */}
        {showSchedule && (
          <div className="modal-backdrop">
            <div className="modal-box bg-white p-3">
              <h5>Schedule Pickup</h5>

              <input
                type="date"
                className="form-control mb-2"
                onChange={(e) =>
                  setScheduleData({
                    ...scheduleData,
                    pickupDate: e.target.value,
                  })
                }
              />

              <input
                type="time"
                className="form-control mb-2"
                onChange={(e) =>
                  setScheduleData({
                    ...scheduleData,
                    pickupTime: e.target.value,
                  })
                }
              />

              <input
                type="text"
                className="form-control mb-2"
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
                className="form-control mb-3"
                placeholder="Driver Contact"
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
                Save
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
    </div>
  );
};

export default CustomerOrders;
