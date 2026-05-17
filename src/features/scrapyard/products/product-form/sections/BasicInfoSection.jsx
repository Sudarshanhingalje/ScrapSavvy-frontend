import { CATEGORIES } from "../constants/categories";
import SelectInput from "../inputs/SelectInput";
import TextAreaInput from "../inputs/TextAreaInput";
import TextInput from "../inputs/TextInput";
import CharacterCounter from "../shared/CharacterCounter";
import FormGrid from "../shared/FormGrid";
import InfoBox from "../shared/InfoBox";
import SectionCard from "../shared/SectionCard";

const Field = ({ label, required, hint, children }) => (
  <div className="pf-field">
    <div className="pf-label">
      {label} {required && <span className="pf-label__req">*</span>}
    </div>
    {children}
    {hint && <div className="pf-hint">{hint}</div>}
  </div>
);

const BasicInfoSection = ({ formData, handle }) => (
  <SectionCard icon="ℹ️" title="Basic information" badge="Required">
    <Field
      label="Product title"
      required
      hint="Include brand, model & key feature. Keep under 80 characters."
    >
      <TextInput
        type="text"
        name="productName"
        value={formData.productName}
        onChange={handle}
        placeholder="e.g. Bosch 18V Cordless Drill Kit with 2 Batteries"
        maxLength={80}
        required
      />
      <CharacterCounter current={formData.productName.length} max={80} />
    </Field>

    <FormGrid cols={2}>
      <Field label="Brand" required>
        <TextInput
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handle}
          placeholder="e.g. Bosch, Samsung, Nike"
          required
        />
      </Field>
      <Field label="Model / SKU">
        <TextInput
          type="text"
          name="model"
          value={formData.model}
          onChange={handle}
          placeholder="e.g. GSB-18V-21"
        />
      </Field>
    </FormGrid>

    <FormGrid cols={2}>
      <Field label="Category" required>
        <SelectInput
          name="categoryId"
          value={formData.categoryId}
          onChange={handle}
          required
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Condition">
        <SelectInput
          name="condition"
          value={formData.condition}
          onChange={handle}
        >
          <option>New</option>
          <option>Refurbished</option>
          <option>Used — like new</option>
          <option>Used — good</option>
        </SelectInput>
      </Field>
    </FormGrid>

    <Field
      label="Description"
      hint="Minimum 100 characters. Describe features, materials, use cases, and what's in the box."
    >
      <InfoBox>
        Good descriptions highlight key features, materials, usage, and
        compatibility. Aim for 150–500 characters.
      </InfoBox>
      <TextAreaInput
        name="description"
        rows={5}
        value={formData.description}
        onChange={handle}
        placeholder="Describe your product clearly — features, materials, use cases, compatibility, and what's included in the package."
        maxLength={500}
      />
      <CharacterCounter current={formData.description.length} max={500} />
    </Field>
  </SectionCard>
);

export default BasicInfoSection;
