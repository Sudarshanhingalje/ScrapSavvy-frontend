const RateCard = ({ material, rate }) => {
  return (
    <div className="cd-rate-card">
      <p className="cd-rate-card__material">
        {material.charAt(0).toUpperCase() + material.slice(1)}
      </p>

      <h3 className="cd-rate-card__price">₹{rate?.customerPrice ?? "--"}</h3>

      <span className="cd-rate-card__unit">per kg</span>
    </div>
  );
};

export default RateCard;
