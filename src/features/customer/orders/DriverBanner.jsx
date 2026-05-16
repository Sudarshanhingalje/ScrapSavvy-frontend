const DriverBanner = ({ driverName, driverContact }) => {
  return (
    <div className="co-driver-banner">
      <span className="co-driver-banner__icon">🚚</span>

      <div>
        <p className="co-driver-banner__title">Driver is on the way!</p>

        <div className="co-driver-banner__details">
          <span>
            <b>Name:</b> {driverName || "Not Assigned"}
          </span>

          <span>
            <b>Contact:</b> {driverContact || "Not Available"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DriverBanner;
