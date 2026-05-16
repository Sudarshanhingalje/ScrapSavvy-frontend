import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getScrapRates } from "../../scrapRates/redux/scrapRatesThunk";
import { PRICE_KEYS } from "../constants/priceKeys";

const LiveRates = () => {
  const dispatch = useDispatch();

  // o here i am just using the data from the redux store
  const { data: prices, loading } = useSelector((state) => state.scrapRates);

  useEffect(() => {
    dispatch(getScrapRates());

    const interval = setInterval(() => {
      dispatch(getScrapRates());
    }, 10000);

    return () => clearInterval(interval);
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

              <div className="cd-rate-chip__val">
                ₹{prices?.[key]?.customerPrice || "--"}
              </div>

              <div className="cd-rate-chip__unit">per kg · customer rate</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveRates;
