const StepBar = () => {
  return (
    <div className="ss-stepbar">
      <div className="ss-step ss-step--done">
        <div className="ss-step-num">✓</div>
        <span>Details</span>
      </div>

      <span className="ss-step-arrow">›</span>

      <div className="ss-step ss-step--active">
        <div className="ss-step-num">2</div>
        <span>Review</span>
      </div>

      <span className="ss-step-arrow">›</span>

      <div className="ss-step">
        <div className="ss-step-num">3</div>
        <span>Confirm</span>
      </div>
    </div>
  );
};

export default StepBar;
