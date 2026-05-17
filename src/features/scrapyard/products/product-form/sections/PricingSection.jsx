import { GST_RATES } from "../constants/gstRates";
import NumberInput from "../inputs/NumberInput";
import FormGrid from "../shared/FormGrid";
import RadioGroup from "../shared/RadioGroup";
import SectionCard from "../shared/SectionCard";
import { calculateDiscount } from "../utils/calculateDiscount";

const Field = ({ label, required, hint, children }) => (
  <div className="pf-field">
    <div className="pf-label">
      {label} {required && <span className="pf-label__req">*</span>}
    </div>
    {children}
    {hint && <div className="pf-hint">{hint}</div>}
  </div>
);

const PricingSection = ({ formData, handle, setField }) => {
  const discount = calculateDiscount(formData.mrp, formData.price);

  return (
    <SectionCard icon="🏷️" title="Pricing & inventory" badge="Required">
      <FormGrid cols={3}>
        <Field
          label="MRP (₹)"
          required
          hint="Maximum retail price (incl. taxes)"
        >
          <NumberInput
            prefix="₹"
            name="mrp"
            value={formData.mrp}
            onChange={handle}
            placeholder="0.00"
            required
          />
        </Field>
        <Field
          label="Selling price (₹)"
          required
          hint="Your listed selling price"
        >
          <NumberInput
            prefix="₹"
            name="price"
            value={formData.price}
            onChange={handle}
            placeholder="0.00"
            required
          />
        </Field>
        <Field label="Discount" hint="Auto-calculated">
          <div
            className={`pf-discount-badge${discount ? " pf-discount-badge--active" : " pf-discount-badge--empty"}`}
          >
            {discount || "—"}
          </div>
        </Field>
      </FormGrid>

      <FormGrid cols={3}>
        <Field label="Stock quantity" required>
          <NumberInput
            name="quantity"
            value={formData.quantity}
            onChange={handle}
            placeholder="e.g. 100"
            required
          />
        </Field>
        <Field label="Min. order qty">
          <NumberInput
            name="minOrderQty"
            value={formData.minOrderQty}
            onChange={handle}
            placeholder="e.g. 1"
          />
        </Field>
        <Field label="Max. order qty">
          <NumberInput
            name="maxOrderQty"
            value={formData.maxOrderQty}
            onChange={handle}
            placeholder="e.g. 10"
          />
        </Field>
      </FormGrid>

      <Field label="GST rate">
        <RadioGroup
          options={GST_RATES.map((r) => ({ value: r, label: `${r}%` }))}
          value={formData.gst}
          onChange={(val) => setField("gst", val)}
        />
      </Field>
    </SectionCard>
  );
};

export default PricingSection;
