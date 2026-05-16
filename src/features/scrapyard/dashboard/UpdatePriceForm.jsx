import { useState } from "react";
import dashboardService from "../services/dashboardService";

const defaultRates = {
  Metal: { customer: "", company: "" },
  Plastic: { customer: "", company: "" },
  Paper: { customer: "", company: "" },
  Glass: { customer: "", company: "" },
  Electronics: { customer: "", company: "" },
  Textiles: { customer: "", company: "" },
  Others: { customer: "", company: "" },
};

const UpdatePriceForm = ({ onSuccess }) => {
  const [rates, setRates] = useState(defaultRates);
  const [loading, setLoading] = useState(false);

  const handleChange = (material, type, value) => {
    setRates((prev) => ({
      ...prev,
      [material]: {
        ...prev[material],
        [type]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const ownerId = localStorage.getItem("userId");

      for (const material in rates) {
        const item = rates[material];

        if (item.customer || item.company) {
          await dashboardService.updatePrice({
            ownerId: Number(ownerId),
            materialType: material,
            customerPrice: Number(item.customer || 0),
            companyPrice: Number(item.company || 0),
          });
        }
      }

      alert("Prices updated successfully ✅");

      setRates(defaultRates);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update prices ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sd-card">
      <h2 className="sd-card-title">✏️ Update Scrap Prices</h2>

      <div className="sd-form-grid">
        {Object.keys(rates).map((material) => (
          <div key={material} className="sd-form-group">
            <label className="sd-form-label">{material}</label>

            <input
              type="number"
              placeholder="Customer ₹/kg"
              className="sd-form-input"
              value={rates[material].customer}
              onChange={(e) =>
                handleChange(material, "customer", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Company ₹/kg"
              className="sd-form-input"
              value={rates[material].company}
              onChange={(e) =>
                handleChange(material, "company", e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="sd-btn-primary"
      >
        {loading ? "Updating..." : "Update Prices"}
      </button>
    </div>
  );
};

export default UpdatePriceForm;
