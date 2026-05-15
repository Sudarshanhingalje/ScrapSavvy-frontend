import RateCard from "./RateCard";

const ScrapRatesSection = ({ dailyRates }) => {
  return (
    <div className="cd-section">
      <div className="cd-section__header">
        <h2 className="cd-section__title">Today's Scrap Rates (Per Kg)</h2>

        <span className="cd-badge--live">● LIVE</span>
      </div>

      <p className="cd-section__subtitle">
        Synced with owner dashboard updates every 10 seconds
      </p>

      {Object.keys(dailyRates).length === 0 ? (
        <p className="cd-loading-text">Loading latest rates...</p>
      ) : (
        <div className="cd-rates-grid">
          {Object.entries(dailyRates).map(([material, rate]) => (
            <RateCard key={material} material={material} rate={rate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrapRatesSection;
