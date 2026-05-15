import { ACTIVITY } from "../constants/activity";

const ActivityFeed = () => {
  return (
    <div className="cd-card">
      <div className="cd-card__body">
        <div className="cd-card__title">🕐 Recent Activity</div>

        {ACTIVITY.map((a, i) => (
          <div className="cd-feed-item" key={i}>
            <div className="cd-feed-icon" style={{ background: a.bg }}>
              {a.icon}
            </div>

            <div style={{ flex: 1 }}>
              <div className="cd-feed-title">{a.title}</div>
              <div className="cd-feed-sub">{a.sub}</div>
            </div>

            <div className="cd-feed-time">{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
