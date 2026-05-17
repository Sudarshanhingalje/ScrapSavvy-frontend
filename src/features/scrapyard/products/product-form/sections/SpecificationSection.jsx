import { WARRANTY_OPTIONS } from "../constants/warrantyOptions";
import SelectInput from "../inputs/SelectInput";
import TextInput from "../inputs/TextInput";
import FormGrid from "../shared/FormGrid";
import SectionCard from "../shared/SectionCard";
import TagInput from "../shared/TagInput";

const Field = ({ label, required, hint, children }) => (
  <div className="pf-field">
    <div className="pf-label">
      {label} {required && <span className="pf-label__req">*</span>}
    </div>
    {children}
    {hint && <div className="pf-hint">{hint}</div>}
  </div>
);

const SpecificationSection = ({
  formData,
  handle,
  handleSpec,
  addSpec,
  removeSpec,
  tagInput,
  setTagInput,
  addTag,
  removeTag,
}) => (
  <SectionCard icon="📋" title="Specifications" badge="Recommended">
    <FormGrid cols={2}>
      <Field label="Warranty">
        <SelectInput
          name="warranty"
          value={formData.warranty}
          onChange={handle}
        >
          {WARRANTY_OPTIONS.map((w) => (
            <option key={w.value} value={w.value}>
              {w.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Country of origin">
        <TextInput
          type="text"
          name="countryOfOrigin"
          value={formData.countryOfOrigin || ""}
          onChange={handle}
          placeholder="e.g. India, China, USA"
        />
      </Field>
    </FormGrid>

    <Field
      label="Key specifications"
      hint="Add attributes like Colour, Material, Weight, Size, etc."
    >
      {formData.specifications.map((spec, i) => (
        <div key={i} className="pf-spec-row">
          <TextInput
            type="text"
            value={spec.key}
            onChange={(e) => handleSpec(i, "key", e.target.value)}
            placeholder="e.g. Colour"
          />
          <TextInput
            type="text"
            value={spec.value}
            onChange={(e) => handleSpec(i, "value", e.target.value)}
            placeholder="e.g. Blue"
          />
          <button
            type="button"
            className="pf-icon-btn"
            onClick={() => removeSpec(i)}
            aria-label="Remove specification"
          >
            🗑
          </button>
        </div>
      ))}
      <button type="button" className="pf-btn-ghost" onClick={addSpec}>
        ＋ Add specification
      </button>
    </Field>

    <Field
      label="Search tags / keywords"
      hint="Press Enter to add each tag. Good tags improve search ranking. Max 10 tags."
    >
      <TagInput
        tags={formData.tags}
        tagInput={tagInput}
        setTagInput={setTagInput}
        onKeyDown={addTag}
        onRemove={removeTag}
      />
    </Field>
  </SectionCard>
);

export default SpecificationSection;
