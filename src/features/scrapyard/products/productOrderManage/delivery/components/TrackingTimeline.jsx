import "../styles/TrackingTimeline.css";
import { TIMELINE_STEPS, getStepIndex } from "../utils/deliveryStatus";

const TrackingTimeline = ({ currentStatus }) => {
  const currentIndex = getStepIndex(currentStatus);

  return (
    <div className="tracking-timeline">
      <div className="tracking-timeline-title">Shipment Timeline</div>

      <div className="tracking-timeline-steps">
        {TIMELINE_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          let dotClass = "tracking-step-dot pending";
          let labelClass = "tracking-step-label pending";
          let stepClass = "tracking-timeline-step";
          let dotContent = "";

          if (isCompleted) {
            dotClass = "tracking-step-dot completed";
            labelClass = "tracking-step-label completed";
            stepClass += " completed";
            dotContent = "✓";
          } else if (isCurrent) {
            dotClass = "tracking-step-dot current";
            labelClass = "tracking-step-label current";
            dotContent = "●";
          } else {
            dotContent = String(index + 1);
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
                  <div className="tracking-step-sublabel current">
                    ● Current Status
                  </div>
                )}

                {isPending && (
                  <div className="tracking-step-sublabel">Upcoming</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingTimeline;
