const BuyerInfoCard = ({ order }) => {
  return (
    <div className="od-card od-buyer-card">
      <div className="od-section-title">Buyer Information</div>

      <div className="od-info-list">
        {/* BUYER NAME */}
        <div className="od-info-row">
          <div className="od-info-label">Buyer Name</div>

          <div className="od-info-value">{order.buyerName || "-"}</div>
        </div>

        {/* BUYER TYPE */}
        <div className="od-info-row">
          <div className="od-info-label">Buyer Type</div>

          <div className="od-info-value">
            <span
              className={`od-type-tag ${
                order.buyerType === "COMPANY"
                  ? "od-tag-company"
                  : "od-tag-customer"
              }`}
            >
              {order.buyerType === "COMPANY" ? "Company" : "Customer"}
            </span>
          </div>
        </div>

        {/* PHONE */}
        <div className="od-info-row">
          <div className="od-info-label">Phone Number</div>

          <div className="od-info-value">{order.buyerPhone || "-"}</div>
        </div>

        {/* EMAIL */}
        <div className="od-info-row">
          <div className="od-info-label">Email Address</div>

          <div className="od-info-value od-email">
            {order.buyerEmail || "-"}
          </div>
        </div>

        {/* ADDRESS */}
        <div className="od-info-row od-address-row">
          <div className="od-info-label">Delivery Address</div>

          <div className="od-info-value od-address">
            {order.buyerAddress || "-"}
          </div>
        </div>

        {/* PAYMENT */}
        <div className="od-info-row">
          <div className="od-info-label">Payment Status</div>

          <div className="od-info-value">
            <span
              className={`od-payment-badge ${order.paymentStatus?.toLowerCase()}`}
            >
              {order.paymentStatus || "PENDING"}
            </span>
          </div>
        </div>

        {/* ORDER DATE */}
        <div className="od-info-row">
          <div className="od-info-label">Order Date</div>

          <div className="od-info-value">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>

        {/* TOTAL */}
        <div className="od-info-row od-total-row">
          <div className="od-info-label">Total Amount</div>

          <div className="od-info-value od-amount">
            ₹{order.totalAmount?.toLocaleString("en-IN")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerInfoCard;
