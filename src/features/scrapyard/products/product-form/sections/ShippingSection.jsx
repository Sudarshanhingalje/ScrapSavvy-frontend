import { SHIPPING_OPTIONS } from "../constants/shippingOptions";
import NumberInput from "../inputs/NumberInput";
import FormGrid from "../shared/FormGrid";
import RadioGroup from "../shared/RadioGroup";
import SectionCard from "../shared/SectionCard";

const Field = ({ label, hint, children, style }) => (
  <div className="pf-field" style={style}>
    <div className="pf-label">{label}</div>
    {children}
    {hint && <div className="pf-hint">{hint}</div>}
  </div>
);

const ShippingSection = ({ formData, handle, setField }) => (
  <SectionCard icon="🚚" title="Shipping & delivery" badge="Recommended">
    <FormGrid cols={3}>
      <Field label="Weight (kg)">
        <NumberInput
          name="weight"
          step="0.1"
          value={formData.weight}
          onChange={handle}
          placeholder="e.g. 1.5"
        />
      </Field>
      <Field label="Length (cm)">
        <NumberInput
          name="length"
          value={formData.length}
          onChange={handle}
          placeholder="e.g. 30"
        />
      </Field>
      <Field label="Width (cm)">
        <NumberInput
          name="width"
          value={formData.width}
          onChange={handle}
          placeholder="e.g. 20"
        />
      </Field>
    </FormGrid>

    <Field label="Height (cm)" style={{ maxWidth: "33%" }}>
      <NumberInput
        name="height"
        value={formData.height}
        onChange={handle}
        placeholder="e.g. 15"
      />
    </Field>

    <Field label="Fulfilled by">
      <RadioGroup
        options={SHIPPING_OPTIONS}
        value={formData.fulfilledBy}
        onChange={(val) => setField("fulfilledBy", val)}
      />
    </Field>
  </SectionCard>
);

export default ShippingSection;
