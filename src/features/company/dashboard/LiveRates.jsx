import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PRICE_KEYS } from "../constants/priceKeys";
import { getLivePrices } from "../redux/companyDashboardThunk";

const LiveRates = () => {
  const dispatch = useDispatch();

  const { prices } = useSelector((state) => state.companyDashboard);

  useEffect(() => {
    dispatch(getLivePrices());
  }, [dispatch]);

  return (
    <div className="cd-card">
      <div className="cd-card__body">
        <div className="cd-live-header">
          <div className="cd-card__title">📊 Live Scrap Rates (₹/kg)</div>

          <span className="cd-live-badge">
            <span className="cd-live-dot" /> LIVE
          </span>
        </div>

        <div className="cd-rates-grid">
          {PRICE_KEYS.map(({ icon, label, key }) => (
            <div className="cd-rate-chip" key={key}>
              <div className="cd-rate-chip__label">
                {icon} {label}
              </div>

              <div className="cd-rate-chip__val">₹{prices[key] || "--"}</div>

              <div className="cd-rate-chip__unit">per kg · company rate</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveRates;
