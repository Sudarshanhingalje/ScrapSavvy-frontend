import "../styles/TrackingTimeline.css";
import { TIMELINE_STEPS, getStepIndex } from "../utils/deliveryStatus";

// DeliveryTimeline is used internally in DeliveryDetailsPage
// It's a simpler alias for TrackingTimeline

const DeliveryTimeline = ({ status }) => {
  const currentIndex = getStepIndex(status);

  return (
    <div className="tracking-timeline">
      <div className="tracking-timeline-title">Delivery Progress</div>

      <div className="tracking-timeline-steps">
        {TIMELINE_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          let dotClass = "tracking-step-dot pending";
          let labelClass = "tracking-step-label pending";
          let stepClass = "tracking-timeline-step";
          let dotContent = String(index + 1);

          if (isCompleted) {
            dotClass = "tracking-step-dot completed";
            labelClass = "tracking-step-label completed";
            stepClass += " completed";
            dotContent = "✓";
          } else if (isCurrent) {
            dotClass = "tracking-step-dot current";
            labelClass = "tracking-step-label current";
            dotContent = "●";
          }

          return (
            <div className={stepClass} key={step.key}>
              <span className={dotClass}>{dotContent}</span>
              <div className="tracking-step-content">
                <div className={labelClass}>
                  <span className="tracking-step-icon">{step.icon}</span>
                  {step.label}
                </div>
                {isCurrent && (
                  <div className="tracking-step-sublabel current">Current</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryTimeline;
