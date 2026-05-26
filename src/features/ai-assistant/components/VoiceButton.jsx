import { FiMic, FiMicOff } from "react-icons/fi";
import "../styles/aiAssistant.css";

const VoiceButton = ({ isListening, onClick, disabled = false }) => {
  return (
    <button
      className={`voice-button ${isListening ? "listening" : ""}`}
      onClick={onClick}
      disabled={disabled}
      title={isListening ? "Stop listening" : "Start voice input"}
      aria-label={isListening ? "Stop listening" : "Start listening"}
    >
      {isListening ? <FiMicOff size={20} /> : <FiMic size={20} />}
    </button>
  );
};

export default VoiceButton;
