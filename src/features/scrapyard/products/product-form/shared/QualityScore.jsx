import { calcQuality, qualityLabel } from "../utils/calculateQuality";

const QualityScore = ({ formData }) => {
  const score = calcQuality(formData);
  const ql = qualityLabel(score);
  const filledBars = Math.round(score / 10);

  return (
    <div className="pf-card">
      <div className="pf-card-header">
        <span style={{ fontSize: 18 }}>📊</span>
        <span className="pf-card-header__title">Listing quality score</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: ql.color }}>
          {score} / 100 — {ql.text}
        </span>
      </div>
      <div className="pf-card-body">
        <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
          Complete all sections to maximise your product's visibility and
          conversion rate.
        </p>
        <div className="pf-quality-bar">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`pf-quality-bar__seg${
                i < filledBars
                  ? score >= 70
                    ? " pf-quality-bar__seg--filled-good"
                    : " pf-quality-bar__seg--filled"
                  : ""
              }`}
            />
          ))}
          <span
            style={{
              fontSize: 12,
              color: ql.color,
              fontWeight: 600,
              marginLeft: 10,
              minWidth: 60,
            }}
          >
            {ql.text}
          </span>
        </div>
        {score < 60 && (
          <div
            className="pf-info-box"
            style={{ marginTop: 12, marginBottom: 0 }}
          >
            <span>💡</span>
            <span>
              {!formData.brand && "Add a brand name. "}
              {formData.description.length < 100 &&
                "Write a longer description (100+ chars). "}
              {formData.images.length === 0 &&
                "Upload at least 1 product image. "}
              {!formData.mrp && "Set an MRP. "}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QualityScore;
