import { useEffect } from "react";

const CelebrationModal = ({ show, onClose, message = "Success!" }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="ce-overlay">
      <div className="ce-modal">
        <div className="ce-emoji">🎉💥✨</div>

        <h2 className="ce-title">Boom!</h2>

        <p className="ce-msg">{message}</p>
      </div>
    </div>
  );
};

export default CelebrationModal;
