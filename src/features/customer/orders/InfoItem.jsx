const InfoItem = ({ label, value, highlight = false, full = false }) => {
  return (
    <div className={`co-info-item${full ? " co-info-item--full" : ""}`}>
      <span className="co-info-item__label">{label}</span>

      <span
        className={`co-info-item__value${
          highlight ? " co-info-item__value--highlight" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default InfoItem;
