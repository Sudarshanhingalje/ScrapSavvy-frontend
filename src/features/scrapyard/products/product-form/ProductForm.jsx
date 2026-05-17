import "../../../scrapyard/products/product-form/styles/inputs.css";
import "../../../scrapyard/products/product-form/styles/productForm.css";
import "../../../scrapyard/products/product-form/styles/responsive.css";
import "../../../scrapyard/products/product-form/styles/sections.css";
import "../../../scrapyard/products/product-form/styles/upload.css";

import { useImageUpload } from "./hooks/useImageUpload";
import { useProductForm } from "./hooks/useProductForm";
import { useTags } from "./hooks/useTags";
import { validateProductForm } from "./utils/validateProductForm";

import BasicInfoSection from "./sections/BasicInfoSection";
import ImageUploadSection from "./sections/ImageUploadSection";
import PricingSection from "./sections/PricingSection";
import ProductStatusSection from "./sections/ProductStatusSection";
import ShippingSection from "./sections/ShippingSection";
import SpecificationSection from "./sections/SpecificationSection";
import QualityScore from "./shared/QualityScore";

const ProductForm = ({ onSubmit, editingProduct, loading }) => {
  const { formData, handle, handleSpec, addSpec, removeSpec, setField, reset } =
    useProductForm(editingProduct);

  const { dragging, setDragging, addImages, removeImage } = useImageUpload(
    formData.images,
    setField,
  );

  const { tagInput, setTagInput, addTag, removeTag } = useTags(
    formData.tags,
    setField,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, message } = validateProductForm(formData);
    if (!valid) {
      alert(message);
      return;
    }
    onSubmit(formData);
    if (!editingProduct) reset();
  };

  return (
    <form onSubmit={handleSubmit} className="pf-wrap">
      <ProductStatusSection editingProduct={editingProduct} />

      <BasicInfoSection formData={formData} handle={handle} />

      <PricingSection formData={formData} handle={handle} setField={setField} />

      <ImageUploadSection
        images={formData.images}
        dragging={dragging}
        setDragging={setDragging}
        addImages={addImages}
        removeImage={removeImage}
      />

      <SpecificationSection
        formData={formData}
        handle={handle}
        handleSpec={handleSpec}
        addSpec={addSpec}
        removeSpec={removeSpec}
        tagInput={tagInput}
        setTagInput={setTagInput}
        addTag={addTag}
        removeTag={removeTag}
      />

      <ShippingSection
        formData={formData}
        handle={handle}
        setField={setField}
      />

      <QualityScore formData={formData} />

      <div className="pf-footer-bar">
        <button type="button" className="pf-btn-secondary">
          Save as draft
        </button>
        <div style={{ display: "flex", gap: 10 }}>
          <button type="button" className="pf-btn-secondary">
            Preview listing
          </button>
          <button type="submit" disabled={loading} className="pf-btn-primary">
            {loading
              ? "⏳ Saving..."
              : editingProduct
                ? "✅ Update product"
                : "🚀 Publish product"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
