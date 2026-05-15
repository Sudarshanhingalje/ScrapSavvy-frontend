const PaymentSection = ({
  order,
  handleCash,
  handleUPI,
  handleRazorpay,
  updatePayment,
}) => {
  if (order.status !== "OUT_FOR_PICKUP") {
    return null;
  }

  return (
    <>
      <hr />

      <p>
        <b>Payment Method:</b>
        {order.paymentMethod || "Not Selected"}
      </p>

      <p>
        <b>Payment Status:</b>
        {order.paymentStatus || "PENDING"}
      </p>

      {order.paymentStatus !== "PAID" && (
        <>
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            <button className="btn btn-dark btn-sm" onClick={handleCash}>
              Cash 💵
            </button>

            <button className="btn btn-info btn-sm" onClick={handleUPI}>
              UPI 📲
            </button>

            <button className="btn btn-warning btn-sm" onClick={handleRazorpay}>
              Pay Online 💳
            </button>
          </div>

          {order.paymentMethod === "UPI" && (
            <button
              className="btn btn-success btn-sm mt-2"
              onClick={() => {
                updatePayment(order.id, "UPI", "PAID", order.totalPrice);
              }}
            >
              I Have Paid ✅
            </button>
          )}
        </>
      )}

      {order.paymentStatus === "PAID" && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          ✔ Payment Successful
        </p>
      )}
    </>
  );
};

export default PaymentSection;
