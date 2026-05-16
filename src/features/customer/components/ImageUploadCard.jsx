const ImageUploadCard = ({ handleImages }) => {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <h5 className="mb-3">Upload Scrap Images</h5>

        <input
          type="file"
          multiple
          accept="image/*"
          className="form-control"
          onChange={handleImages}
        />

        <small className="text-muted">Minimum 1 image required</small>
      </div>
    </div>
  );
};

export default ImageUploadCard;
