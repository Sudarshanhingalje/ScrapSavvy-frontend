import { useEffect } from "react";
import frontpageimg1 from "../../assets/images/frontpageimg1.png";
import "../../static/CelebrationModal.css";

/**
 * CelebrationModal – Split Panel Style
 */

const CelebrationModal = ({
  show,
  onClose,
  message = "Thank you for shopping with Scrap Savvy! Your order has been placed successfully. Track your order to stay updated on delivery.",
  title = "Order Confirmed!",
  badge = "ORDER CONFIRMED",
  btnText = "Track My Order",
  autoClose = 0,
}) => {
  useEffect(() => {
    if (show && autoClose > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [show, onClose, autoClose]);

  if (!show) return null;

  return (
    <div className="ce-overlay" onClick={onClose}>
      <div className="ce-modal" onClick={(e) => e.stopPropagation()}>
        {/* LEFT PANEL */}
        <div className="ce-left-panel">
          <img src={frontpageimg1} alt="ScrapSavvy" className="ce-mascot-img" />
        </div>

        {/* RIGHT PANEL */}
        <div className="ce-right-panel">
          {badge && <span className="ce-badge">{badge}</span>}

          <h2 className="ce-title">{title}</h2>

          <p className="ce-msg">{message}</p>

          <button className="ce-close-btn" onClick={onClose}>
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CelebrationModal;
