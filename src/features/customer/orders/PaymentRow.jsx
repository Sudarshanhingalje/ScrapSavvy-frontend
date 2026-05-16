const PaymentRow = ({ method, paymentStatus }) => {
  const badge = paymentStatus?.toUpperCase() ?? "PENDING";

  return (
    <div className="co-payment-row">
      <span className="co-payment-row__label">💳 {method || "—"}</span>

      <span className={`co-payment-badge co-payment-badge--${badge}`}>
        {badge}
      </span>
    </div>
  );
};

export default PaymentRow;
