import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignDeliveryDriver } from "../redux/deliveryThunk";
import "../styles/AssignDriverModal.css";

const DELIVERY_PARTNERS = [
  "Delhivery",
  "BlueDart",
  "Ekart",
  "Dunzo",
  "Porter",
  "Other",
];

const AssignDriverModal = ({ orderId, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.delivery);

  const [formData, setFormData] = useState({
    driverName: "",
    driverPhone: "",
    vehicleNumber: "",
    deliveryPartner: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.driverName.trim())
      errs.driverName = "Driver name is required";
    if (!formData.driverPhone.trim()) errs.driverPhone = "Phone is required";
    if (!formData.vehicleNumber.trim())
      errs.vehicleNumber = "Vehicle number is required";
    if (!formData.deliveryPartner)
      errs.deliveryPartner = "Select a delivery partner";
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const result = await dispatch(
      assignDeliveryDriver({ id: orderId, driverData: formData }),
    );

    if (assignDeliveryDriver.fulfilled.match(result)) {
      if (onSuccess) onSuccess(result.payload);
      onClose();
    }
  };

  return (
    <div className="assign-driver-overlay" onClick={onClose}>
      <div className="assign-driver-modal" onClick={(e) => e.stopPropagation()}>
        <button className="assign-driver-modal-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="assign-driver-modal-title">🚗 Assign Driver</h2>

        <form className="assign-driver-form" onSubmit={handleSubmit}>
          <div className="assign-driver-form-group">
            <label className="assign-driver-form-label">Driver Name *</label>
            <input
              type="text"
              name="driverName"
              className="assign-driver-form-input"
              placeholder="e.g. Ramesh Kumar"
              value={formData.driverName}
              onChange={handleChange}
            />
            {errors.driverName && (
              <span style={{ color: "#dc2626", fontSize: "12px" }}>
                {errors.driverName}
              </span>
            )}
          </div>

          <div className="assign-driver-form-group">
            <label className="assign-driver-form-label">Driver Phone *</label>
            <input
              type="tel"
              name="driverPhone"
              className="assign-driver-form-input"
              placeholder="e.g. 9876543210"
              value={formData.driverPhone}
              onChange={handleChange}
            />
            {errors.driverPhone && (
              <span style={{ color: "#dc2626", fontSize: "12px" }}>
                {errors.driverPhone}
              </span>
            )}
          </div>

          <div className="assign-driver-form-group">
            <label className="assign-driver-form-label">Vehicle Number *</label>
            <input
              type="text"
              name="vehicleNumber"
              className="assign-driver-form-input"
              placeholder="e.g. MH-12-AB-1234"
              value={formData.vehicleNumber}
              onChange={handleChange}
            />
            {errors.vehicleNumber && (
              <span style={{ color: "#dc2626", fontSize: "12px" }}>
                {errors.vehicleNumber}
              </span>
            )}
          </div>

          <div className="assign-driver-form-group">
            <label className="assign-driver-form-label">
              Delivery Partner *
            </label>
            <select
              name="deliveryPartner"
              className="assign-driver-form-input"
              value={formData.deliveryPartner}
              onChange={handleChange}
            >
              <option value="">Select Partner</option>
              {DELIVERY_PARTNERS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.deliveryPartner && (
              <span style={{ color: "#dc2626", fontSize: "12px" }}>
                {errors.deliveryPartner}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="assign-driver-submit-btn"
            disabled={loading}
          >
            {loading ? "Assigning..." : "✅ Assign Driver"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignDriverModal;
