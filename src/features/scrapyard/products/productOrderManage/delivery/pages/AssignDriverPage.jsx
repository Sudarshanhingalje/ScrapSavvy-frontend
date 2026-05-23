import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  assignDeliveryDriver,
  fetchDeliveryById,
} from "../redux/deliveryThunk";
import "../styles/AssignDriverModal.css";

import ScrapyardSidebar from "../../../../../../shared/layout/ScrapyardSidebar";
import DeliveryInfoCard from "../components/DeliveryInfoCard";

const DELIVERY_PARTNERS = [
  "Delhivery",
  "BlueDart",
  "Ekart",
  "Dunzo",
  "Porter",
  "Other",
];

const AssignDriverPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedDelivery, loading } = useSelector((state) => state.delivery);

  const [formData, setFormData] = useState({
    driverName: "",
    driverPhone: "",
    vehicleNumber: "",
    deliveryPartner: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchDeliveryById(id));
  }, [dispatch, id]);

  const validate = () => {
    const errs = {};
    if (!formData.driverName.trim())
      errs.driverName = "Driver name is required";
    if (!formData.driverPhone.trim())
      errs.driverPhone = "Phone number is required";
    if (!/^[0-9]{10}$/.test(formData.driverPhone.trim()))
      errs.driverPhone = "Enter a valid 10-digit phone number";
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
      assignDeliveryDriver({ id, driverData: formData }),
    );

    if (assignDeliveryDriver.fulfilled.match(result)) {
      setSuccess(true);
      setTimeout(() => {
        navigate(`/scrapyard/delivery/${id}`);
      }, 1500);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      <ScrapyardSidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          marginLeft: "260px",
          maxWidth: "700px",
        }}
      >
        {/* BACK */}
        <button
          onClick={() => navigate(`/scrapyard/delivery/${id}`)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "20px",
            padding: "8px 16px",
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            color: "#374151",
            fontWeight: "500",
          }}
        >
          ← Back
        </button>

        <h1
          style={{
            fontSize: "24px",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "24px",
          }}
        >
          🚗 Assign Driver
        </h1>

        {/* ORDER INFO */}
        {selectedDelivery && <DeliveryInfoCard delivery={selectedDelivery} />}

        {/* SUCCESS */}
        {success && (
          <div
            style={{
              background: "#dcfce7",
              border: "1px solid #4ade80",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "20px",
              color: "#14532d",
              fontWeight: "600",
              fontSize: "15px",
              textAlign: "center",
            }}
          >
            ✅ Driver assigned successfully! Redirecting...
          </div>
        )}

        {/* FORM */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "28px",
            marginTop: "16px",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "20px",
            }}
          >
            Driver Details
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Driver Name */}
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

            {/* Driver Phone */}
            <div className="assign-driver-form-group">
              <label className="assign-driver-form-label">Driver Phone *</label>
              <input
                type="tel"
                name="driverPhone"
                className="assign-driver-form-input"
                placeholder="10-digit mobile number"
                value={formData.driverPhone}
                onChange={handleChange}
                maxLength={10}
              />
              {errors.driverPhone && (
                <span style={{ color: "#dc2626", fontSize: "12px" }}>
                  {errors.driverPhone}
                </span>
              )}
            </div>

            {/* Vehicle Number */}
            <div className="assign-driver-form-group">
              <label className="assign-driver-form-label">
                Vehicle Number *
              </label>
              <input
                type="text"
                name="vehicleNumber"
                className="assign-driver-form-input"
                placeholder="e.g. MH-12-AB-1234"
                value={formData.vehicleNumber}
                onChange={handleChange}
                style={{ textTransform: "uppercase" }}
              />
              {errors.vehicleNumber && (
                <span style={{ color: "#dc2626", fontSize: "12px" }}>
                  {errors.vehicleNumber}
                </span>
              )}
            </div>

            {/* Delivery Partner */}
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
                <option value="">Select Delivery Partner</option>
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

            {/* NOTE */}
            <div
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "10px",
                padding: "12px 16px",
                fontSize: "13px",
                color: "#1d4ed8",
              }}
            >
              📅 <strong>Note:</strong> Estimated delivery will be automatically
              set to 3 days from today after assigning.
            </div>

            <button
              type="submit"
              disabled={loading || success}
              style={{
                padding: "14px",
                background: loading || success ? "#94a3b8" : "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "700",
                cursor: loading || success ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Assigning..." : "✅ Assign Driver"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignDriverPage;
