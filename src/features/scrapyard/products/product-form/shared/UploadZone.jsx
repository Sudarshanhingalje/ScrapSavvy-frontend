import { useRef } from "react";

const UploadZone = ({
  dragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFiles,
  imageCount,
}) => {
  const fileInputRef = useRef();

  return (
    <div
      className={`pf-upload-zone${dragging ? " pf-upload-zone--drag" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver();
      }}
      onDragLeave={onDragLeave}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(e.dataTransfer.files);
      }}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) => onFiles(e.target.files)}
      />
      <div style={{ fontSize: 32, marginBottom: 8 }}>☁️</div>
      <p
        style={{
          fontSize: 13,
          color: "#374151",
          fontWeight: 500,
          marginBottom: 4,
        }}
      >
        Drag & drop images here or click to browse
      </p>
      <p style={{ fontSize: 11, color: "#9ca3af" }}>
        JPG, PNG — min 500×500px — max 5MB each — up to 5 images
      </p>
      {imageCount > 0 && (
        <p
          style={{
            fontSize: 12,
            color: "#2563eb",
            fontWeight: 600,
            marginTop: 8,
          }}
        >
          {imageCount}/5 uploaded
          {imageCount < 5 && ` · ${5 - imageCount} more allowed`}
        </p>
      )}
    </div>
  );
};

export default UploadZone;
