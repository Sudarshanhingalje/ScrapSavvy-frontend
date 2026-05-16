import { generateCustomerInvoice } from "../pages/CustomerInvoice";

import { getStatusDot, getStepIndex } from "../constants/orderStatus";

import { formatDate } from "../utils/formatDate";

import DriverBanner from "./DriverBanner";
import InfoItem from "./InfoItem";
import PaymentRow from "./PaymentRow";
import StatusBadge from "./StatusBadge";
import Stepper from "./Stepper";

const OrderCard = ({ order }) => {
  const currentStep = getStepIndex(order.status);

  const accentColor = getStatusDot(order.status);

  return (
    <div className="co-order-card">
      <div
        className="co-order-card__accent"
        style={{ background: accentColor }}
      />

      <div className="co-order-card__body">
        <div className="co-order-card__header">
          <div>
            <p className="co-order-card__id">Order #{order.id}</p>

            <h3 className="co-order-card__scrap-type">{order.scrapType}</h3>
          </div>

          <StatusBadge status={order.status} />
        </div>

        <div className="co-info-grid">
          <InfoItem
            label="Total Quantity"
            value={`${order.quantity} KG`}
            highlight
          />

          <InfoItem
            label="Total Amount"
            value={`₹${order.totalPrice || 0}`}
            highlight
          />

          <InfoItem label="Order Date" value={formatDate(order.createdAt)} />

          <InfoItem label="Pickup Date" value={order.pickupDate || "—"} />

          <InfoItem label="Pickup Time" value={order.pickupTime || "—"} />

          <InfoItem label="Contact" value={order.contactNo || "—"} />

          <InfoItem label="Address" value={order.pickupAddress || "—"} full />
        </div>

        <hr className="co-card-divider" />

        {order.status === "OUT_FOR_PICKUP" && (
          <>
            <DriverBanner
              driverName={order.assignedDriver}
              driverContact={order.driverContactNo}
            />

            <hr className="co-card-divider" />
          </>
        )}

        <PaymentRow
          method={order.paymentMethod}
          paymentStatus={order.paymentStatus}
        />

        <hr className="co-card-divider" />

        <Stepper currentStep={currentStep} />

        {order.status?.toUpperCase() === "COMPLETED" && (
          <>
            <hr className="co-card-divider" />

            <button
              className="co-invoice-btn"
              onClick={() => generateCustomerInvoice(order)}
            >
              📄 Download Invoice
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
