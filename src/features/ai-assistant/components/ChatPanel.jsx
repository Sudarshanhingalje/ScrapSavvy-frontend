import { useEffect, useRef, useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import "../styles/aiAssistant.css";
import LanguageSelector from "./LanguageSelector";
import VoiceButton from "./VoiceButton";
import WaveAnimation from "./WaveAnimation";

const ChatPanel = ({
  messages,
  onSendMessage,
  onVoiceClick,
  isListening,
  isSpeaking,
  isLoading,
  transcript,
  language,
  onLanguageChange,
  onClose,
}) => {
  const [textInput, setTextInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (textInput.trim()) {
      onSendMessage(textInput);
      setTextInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-panel">
      {/* Header */}
      <div className="chat-header">
        <h3>ScrapSavvy AI Assistant</h3>
        <button className="close-btn" onClick={onClose} aria-label="Close chat">
          <FiX size={24} />
        </button>
      </div>

      {/* Language Selector */}
      <LanguageSelector
        currentLanguage={language}
        onLanguageChange={onLanguageChange}
      />

      {/* Messages Container */}
      <div className="messages-container">
        {messages.length === 0 && (
          <div style={{ textAlign: "center", color: "#999", padding: "20px" }}>
            <p>👋 Start speaking or type a message</p>
            <p style={{ fontSize: "12px" }}>
              Click the microphone or press Enter
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.type === "user" ? "user-message" : "ai-message"
            } ${message.isError ? "error" : ""}`}
          >
            {message.text}
          </div>
        ))}

        {isLoading && (
          <div className="ai-message">
            <div className="typing-indicator">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Transcript Display */}
      {(isListening || transcript) && (
        <div className="transcript-display">
          {isListening && <WaveAnimation />}
          {transcript && <p>{transcript}</p>}
        </div>
      )}

      {/* Input Section */}
      <div className="chat-input-section">
        <input
          type="text"
          className="input-field"
          placeholder="Type a message..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <VoiceButton
          isListening={isListening}
          onClick={onVoiceClick}
          disabled={isLoading}
        />
        <button
          className="voice-button"
          onClick={handleSendMessage}
          disabled={isLoading || !textInput.trim()}
          title="Send message"
          style={{
            background: !textInput.trim()
              ? "#ccc"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
