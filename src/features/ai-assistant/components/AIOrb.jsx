import { motion } from "framer-motion";
import { useState } from "react";
import { FiMic } from "react-icons/fi";
import "../styles/aiAssistant.css";

const AIOrb = ({ onOrbClick, isListening, isSpeaking }) => {
  const [orbHover, setOrbHover] = useState(false);

  const orbVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    listen: {
      boxShadow: [
        "0 8px 32px rgba(102, 126, 234, 0.4)",
        "0 8px 32px rgba(102, 126, 234, 0.8)",
        "0 8px 32px rgba(102, 126, 234, 0.4)",
      ],
    },
  };

  return (
    <motion.div
      className={`ai-orb ${isListening ? "listening" : ""}`}
      onClick={onOrbClick}
      onMouseEnter={() => setOrbHover(true)}
      onMouseLeave={() => setOrbHover(false)}
      variants={orbVariants}
      initial="initial"
      animate={isListening ? "listen" : orbHover ? "hover" : "initial"}
      transition={{
        duration: isListening ? 0.8 : 0.3,
        repeat: isListening ? Infinity : 0,
      }}
    >
      <motion.div
        className="ai-orb-icon"
        animate={isSpeaking ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.5, repeat: isSpeaking ? Infinity : 0 }}
      >
        <FiMic size={40} />
      </motion.div>
    </motion.div>
  );
};

export default AIOrb;
