const ImagePreviewGrid = ({ images, onRemove }) => (
  <div className="pf-img-grid">
    {Array.from({ length: 5 }).map((_, i) => {
      const img = images[i];
      return img ? (
        <div key={i} className="pf-img-thumb">
          <img
            src={img.url}
            alt={`Product ${i + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {i === 0 && <div className="pf-img-primary-badge">MAIN</div>}
          <button
            type="button"
            className="pf-img-del-btn"
            onClick={() => onRemove(i)}
            aria-label={`Remove image ${i + 1}`}
          >
            ×
          </button>
        </div>
      ) : (
        <div key={i} className="pf-img-empty">
          +
        </div>
      );
    })}
  </div>
);

export default ImagePreviewGrid;
