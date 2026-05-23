import { useDispatch } from "react-redux";

import { updateStatus } from "../redux/deliveryThunk";

const DeliveryActionButtons = ({ deliveryId }) => {
  const dispatch = useDispatch();

  const handleStatusUpdate = (status) => {
    dispatch(
      updateStatus({
        id: deliveryId,
        status,
      }),
    );
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginTop: "20px",
      }}
    >
      <button onClick={() => handleStatusUpdate("PICKED_UP")}>Picked Up</button>

      <button onClick={() => handleStatusUpdate("IN_TRANSIT")}>
        In Transit
      </button>

      <button onClick={() => handleStatusUpdate("OUT_FOR_DELIVERY")}>
        Out For Delivery
      </button>

      <button onClick={() => handleStatusUpdate("DELIVERED")}>Delivered</button>

      <button onClick={() => handleStatusUpdate("FAILED")}>Failed</button>
    </div>
  );
};

export default DeliveryActionButtons;
