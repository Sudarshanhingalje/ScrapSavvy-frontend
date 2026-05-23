import { useState } from "react";
import { useDispatch } from "react-redux";

import { assignDeliveryDriver } from "../redux/deliveryThunk";

const AssignDriverModal = ({ orderId, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    orderId,
    driverName: "",
    driverPhone: "",
    vehicleNumber: "",
    deliveryPartner: "",
    estimatedDelivery: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(assignDeliveryDriver(formData));

    onClose();
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #ddd",
      }}
    >
      <h2>Assign Driver</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="driverName"
          placeholder="Driver Name"
          value={formData.driverName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="driverPhone"
          placeholder="Driver Phone"
          value={formData.driverPhone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={formData.vehicleNumber}
          onChange={handleChange}
        />

        <input
          type="text"
          name="deliveryPartner"
          placeholder="Delivery Partner"
          value={formData.deliveryPartner}
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="estimatedDelivery"
          value={formData.estimatedDelivery}
          onChange={handleChange}
        />

        <button type="submit">Assign Driver</button>
      </form>
    </div>
  );
};

export default AssignDriverModal;
