import { useNavigate } from "react-router-dom";
import "../styles/DeliveryTable.css";
import { formatDeliveryDate, getCustomerName } from "../utils/deliveryHelpers";
import DeliveryStatusBadge from "./DeliveryStatusBadge";

const DeliveryTable = ({ deliveries }) => {
  const navigate = useNavigate();

  if (!deliveries || deliveries.length === 0) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "#64748b",
          background: "#fff",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
        }}
      >
        No deliveries found
      </div>
    );
  }

  return (
    <div className="delivery-table-wrapper">
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Tracking ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Driver</th>
            <th>Est. Delivery</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.orderId}>
              <td>#{delivery.orderId}</td>
              <td style={{ fontFamily: "monospace", fontSize: "12px" }}>
                {delivery.trackingId || "—"}
              </td>
              <td>{getCustomerName(delivery)}</td>
              <td>
                <DeliveryStatusBadge status={delivery.deliveryStatus} />
              </td>
              <td>{delivery.driverName || "Not Assigned"}</td>
              <td>{formatDeliveryDate(delivery.estimatedDelivery)}</td>
              <td>
                <button
                  className="delivery-table-action-btn"
                  onClick={() =>
                    navigate(`/scrapyard/delivery/${delivery.orderId}`)
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryTable;
