import { steps } from "../constants/orderStatus";

const Stepper = ({ currentStep }) => {
  return (
    <div className="co-tracking">
      <p className="co-tracking__title">Live Tracking</p>

      <div className="co-stepper">
        {steps.map((step, index) => {
          const done = currentStep >= index;

          return (
            <div
              key={step}
              className={`co-step${done ? " co-step--done" : ""}`}
            >
              <div className="co-step__dot">
                {done && <span className="co-step__check">✓</span>}
              </div>

              <span className="co-step__label">{step.replace(/_/g, " ")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
