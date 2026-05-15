import { BIDS } from "../constants/bids";
const BidBoard = () => {
  return (
    <div>
      <p className="cd-section-lbl">Live Bidding Board</p>

      <div className="cd-g3">
        {BIDS.map((b) => {
          const pct = Math.round((b.current / b.target) * 100);

          return (
            <div className="cd-bid-card" key={b.material}>
              <div className="cd-bid-top">
                <div>
                  <div className="cd-bid-mat">{b.material}</div>
                  <div className="cd-bid-qty">{b.qty}</div>
                </div>

                <span className="cd-bid-dl">⏱ {b.deadline}</span>
              </div>

              <div className="cd-bid-price-row">
                <span className="cd-bid-price">₹{b.current}</span>
                <span className="cd-bid-perkg">/kg</span>
              </div>

              <div className="cd-bid-prog-row">
                <span>{pct}% Target</span>
                <span>Target ₹{b.target}</span>
              </div>

              <div className="cd-bid-bar">
                <div className="cd-bid-fill" style={{ width: `${pct}%` }} />
              </div>

              <div className="cd-bid-foot">
                <span className="cd-bid-bidders">👥 {b.bids} bidders</span>

                <button className="cd-bid-btn">Place Bid →</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BidBoard;
