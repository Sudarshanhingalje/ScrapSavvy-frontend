import { generateInvoice } from "../../../shared/components/Invoice";
import Razorpay from "../../../shared/components/Razorpay";

import PaymentSection from "./PaymentSection";
import StatusBadge from "./StatusBadge";
import TrackingTimeline from "./TrackingTimeline";

import { formatDate } from "../utils/formatDate";

const OrderCard = ({ order }) => {
  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:8080/api/scrap-orders/${id}/status?status=${status}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };

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
  };

  const handleCash = async () => {
    await updatePayment(order.id, "COD", "PENDING", order.totalPrice);
    await updateStatus(order.id, "COMPLETED");
    window.location.reload();
  };

  const handleUPI = async () => {
    const upiId = "sudarshanhingalje1-1@oksbi";

    const upiUrl = `upi://pay?pa=${upiId}&pn=ScrapSavvy&am=${order.totalPrice}&cu=INR`;

    window.location.href = upiUrl;

    await updatePayment(order.id, "UPI", "PENDING", order.totalPrice);
  };

  const handleRazorpay = async () => {
    const paymentId = await Razorpay(order.totalPrice);

    await updatePayment(
      order.id,
      "RAZORPAY",
      "PAID",
      order.totalPrice,
      paymentId,
    );

    window.location.reload();
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow-sm p-3 h-100">
        <h5 className="mb-2">{order.scrapType}</h5>

        <p>
          <b>Quantity:</b> {order.quantity ?? 0} kg
        </p>

        <p>
          <b>Total:</b> ₹{order.totalPrice ?? 0}
        </p>

        <p>
          <b>Contact:</b> {order.contactNo ?? "—"}
        </p>

        <p>
          <b>Order Date:</b> {formatDate(order.createdAt)}
        </p>

        {/* SCHEDULED */}
        {order.status === "SCHEDULED" && (
          <>
            <hr />

            <p>
              <b>Pickup Date:</b> {formatDate(order.pickupDate)}
            </p>

            <p>
              <b>Pickup Time:</b> {order.pickupTime || "—"}
            </p>
          </>
        )}

        {/* OUT FOR PICKUP */}
        {order.status === "OUT_FOR_PICKUP" && (
          <>
            <hr />

            <p style={{ color: "#17a2b8", fontWeight: "600" }}>
              🚚 Driver is on the way
            </p>

            <p>
              <b>Driver Name:</b> {order.assignedDriver || "Not Assigned"}
            </p>

            <p>
              <b>Driver Contact:</b> {order.driverContactNo || "Not Available"}
            </p>
          </>
        )}

        {/* TIMELINE */}
        <TrackingTimeline status={order.status} />

        {/* PAYMENT */}
        <PaymentSection
          order={order}
          handleCash={handleCash}
          handleUPI={handleUPI}
          handleRazorpay={handleRazorpay}
          updatePayment={updatePayment}
        />

        {/* STATUS + INVOICE */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <StatusBadge status={order.status} />

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
};

export default OrderCard;
