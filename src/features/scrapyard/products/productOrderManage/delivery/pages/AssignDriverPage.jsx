// ==============================
// FILE: AssignDriverPage.jsx
// ==============================

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { assignDeliveryDriver } from "../redux/deliveryThunk";

const AssignDriverPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    driverName: "",
    driverPhone: "",
    vehicleNumber: "",
    deliveryPartner: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      assignDeliveryDriver({
        id,
        driverData: formData,
      }),
    );

    navigate(`/scrapyard/delivery/${id}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Assign Driver</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "500px",
          marginTop: "20px",
        }}
      >
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

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Assign Driver
        </button>
      </form>
    </div>
  );
};

export default AssignDriverPage;
