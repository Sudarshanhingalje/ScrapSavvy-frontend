const SectionCard = ({ icon, title, badge, children }) => (
  <div className="pf-card">
    <div className="pf-card-header">
      <span style={{ fontSize: 18, color: "#6b7280" }}>{icon}</span>
      <span className="pf-card-header__title">{title}</span>
      {badge && (
        <span
          className={
            badge === "Required"
              ? "pf-card-header__badge--required"
              : "pf-card-header__badge--optional"
          }
        >
          {badge}
        </span>
      )}
    </div>
    <div className="pf-card-body">{children}</div>
  </div>
);

export default SectionCard;
