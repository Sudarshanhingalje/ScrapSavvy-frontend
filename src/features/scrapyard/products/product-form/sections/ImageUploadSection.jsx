import ImagePreviewGrid from "../shared/ImagePreviewGrid";
import SectionCard from "../shared/SectionCard";
import UploadZone from "../shared/UploadZone";

const ImageUploadSection = ({
  images,
  dragging,
  setDragging,
  addImages,
  removeImage,
}) => (
  <SectionCard icon="📷" title="Product images" badge="Required">
    <div className="pf-info-box">
      <span>ℹ️</span>
      <span>
        Use a white background for the primary image. Min 500×500px, JPG or PNG.
        The first image is shown as the main product photo.
      </span>
    </div>

    <UploadZone
      dragging={dragging}
      onDragOver={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDrop={addImages}
      onFiles={addImages}
      imageCount={images.length}
    />

    <ImagePreviewGrid images={images} onRemove={removeImage} />
  </SectionCard>
);

export default ImageUploadSection;
