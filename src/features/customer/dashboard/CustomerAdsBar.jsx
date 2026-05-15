const CustomerAdsBar = ({ ads }) => {
  return (
    <div className="cd-ads-bar">
      <div className="cd-ads-marquee">
        <div className="cd-ads-content">{ads.join(" • ")}</div>
      </div>
    </div>
  );
};

export default CustomerAdsBar;
