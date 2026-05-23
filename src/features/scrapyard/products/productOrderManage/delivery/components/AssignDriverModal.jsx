import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignDeliveryDriver } from "../redux/deliveryThunk";
import "../styles/AssignDriverModal.css";
import { DELIVERY_PARTNERS, DRIVERS } from "../utils/deliveryStatus";

const AssignDriverModal = ({ orderId, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.delivery);

  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [errors, setErrors] = useState({});

  // ── Derived: selected objects ─────────────────────────────
  const selectedDriver = DRIVERS.find((d) => d.id === Number(selectedDriverId));
  const selectedPartner = DELIVERY_PARTNERS.find(
    (p) => p.id === Number(selectedPartnerId),
  );

  // ── Validation ────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!selectedDriverId) errs.driver = "Please select a driver";
    if (!selectedPartnerId) errs.partner = "Please select a delivery partner";
    return errs;
  };

  // ── Submit ────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const driverData = {
      driverName: selectedDriver.name,
      driverPhone: selectedDriver.phone,
      vehicleNumber: selectedDriver.vehicleNumber,
      deliveryPartner: selectedPartner.name,
    };

    const result = await dispatch(
      assignDeliveryDriver({ id: orderId, driverData }),
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
          {/* ── Driver Dropdown ── */}
          <div className="assign-driver-form-group">
            <label className="assign-driver-form-label">Select Driver *</label>
            <select
              className="assign-driver-form-input"
              value={selectedDriverId}
              onChange={(e) => {
                setSelectedDriverId(e.target.value);
                setErrors({ ...errors, driver: "" });
              }}
            >
              <option value="">— Choose a driver —</option>

              <optgroup label="🏍️ Bike Drivers">
                {DRIVERS.filter((d) => d.vehicleType === "Bike").map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.vehicleBrand} ({d.vehicleNumber})
                  </option>
                ))}
              </optgroup>

              <optgroup label="🚗 Car Drivers">
                {DRIVERS.filter((d) => d.vehicleType === "Car").map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.vehicleBrand} ({d.vehicleNumber})
                  </option>
                ))}
              </optgroup>
            </select>
            {errors.driver && (
              <span style={{ color: "#dc2626", fontSize: "12px" }}>
                {errors.driver}
              </span>
            )}
          </div>

          {/* ── Auto-filled driver info ── */}
          {selectedDriver && (
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #86efac",
                borderRadius: "10px",
                padding: "12px 16px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                fontSize: "13px",
              }}
            >
              {[
                ["👤 Name", selectedDriver.name],
                ["📞 Phone", selectedDriver.phone],
                ["🚘 Vehicle", selectedDriver.vehicleBrand],
                ["🔢 Reg No.", selectedDriver.vehicleNumber],
              ].map(([label, value]) => (
                <div key={label}>
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ color: "#0f172a", fontWeight: 700 }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Delivery Partner Dropdown ── */}
          <div className="assign-driver-form-group">
            <label className="assign-driver-form-label">
              Delivery Partner *
            </label>
            <select
              className="assign-driver-form-input"
              value={selectedPartnerId}
              onChange={(e) => {
                setSelectedPartnerId(e.target.value);
                setErrors({ ...errors, partner: "" });
              }}
            >
              <option value="">— Choose a partner —</option>
              {DELIVERY_PARTNERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.icon} {p.name}
                </option>
              ))}
            </select>
            {errors.partner && (
              <span style={{ color: "#dc2626", fontSize: "12px" }}>
                {errors.partner}
              </span>
            )}
          </div>

          {/* ── Submit ── */}
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
