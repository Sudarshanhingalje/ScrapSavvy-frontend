import { useNavigate } from "react-router-dom";
import "../styles/DeliveryCard.css";
import { formatDeliveryDate, getCustomerName } from "../utils/deliveryHelpers";
import DeliveryStatusBadge from "./DeliveryStatusBadge";
import TrackingIdBadge from "./TrackingIdBadge";

const DeliveryCard = ({ delivery, onViewDetails }) => {
  const navigate = useNavigate();
  const customerName = getCustomerName(delivery);

  const handleView = () => {
    if (onViewDetails) {
      onViewDetails(delivery.orderId);
    } else {
      navigate(`/scrapyard/delivery/${delivery.orderId}`);
    }
  };

  const handleAssignDriver = () => {
    navigate(`/scrapyard/assign-driver/${delivery.orderId}`);
  };

  return (
    <div className="delivery-card">
      {/* HEADER */}
      <div className="delivery-card-header">
        <span className="delivery-card-order-id">
          Order #{delivery.orderId}
        </span>
        <DeliveryStatusBadge status={delivery.deliveryStatus} />
      </div>

      {/* TRACKING ID */}
      <TrackingIdBadge trackingId={delivery.trackingId} />

      {/* INFO */}
      <div className="delivery-card-body">
        <p className="delivery-card-info">
          <strong>Customer:</strong> {customerName}
        </p>

        <p className="delivery-card-info">
          <strong>Amount:</strong> ₹
          {Number(delivery.totalAmount || 0).toLocaleString("en-IN")}
        </p>

        <p className="delivery-card-info">
          <strong>Estimated Delivery:</strong>{" "}
          {formatDeliveryDate(delivery.estimatedDelivery)}
        </p>

        {delivery.driverName && (
          <p className="delivery-card-info">
            <strong>Driver:</strong> {delivery.driverName} (
            {delivery.deliveryPartner || "N/A"})
          </p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="delivery-card-actions">
        <button
          className="delivery-card-btn delivery-card-btn-primary"
          onClick={handleView}
        >
          View Details
        </button>

        {!delivery.driverName && (
          <button
            className="delivery-card-btn delivery-card-btn-secondary"
            onClick={handleAssignDriver}
          >
            Assign Driver
          </button>
        )}
      </div>
    </div>
  );
};

export default DeliveryCard;
