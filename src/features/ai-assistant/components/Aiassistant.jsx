import { useState } from "react";
import useAIChat from "../hooks/useAIChat";
import "../styles/aiAssistant.css";
import AIOrb from "./AIOrb";
import ChatPanel from "./ChatPanel";

const AIAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const {
    messages,
    isLoading,
    error,
    language,
    handleLanguageChange,
    sendMessage,
    handleVoiceInput,
    clearChat,
    transcript,
    isListening,
    isSpeaking,
  } = useAIChat();

  const handleOrbClick = () => {
    if (isChatOpen) {
      handleVoiceInput();
    } else {
      setIsChatOpen(true);
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="ai-assistant-container">
      {/* AI Orb */}
      <AIOrb
        onOrbClick={handleOrbClick}
        isListening={isListening}
        isSpeaking={isSpeaking}
      />

      {/* Chat Panel */}
      {isChatOpen && (
        <ChatPanel
          messages={messages}
          onSendMessage={sendMessage}
          onVoiceClick={handleVoiceInput}
          isListening={isListening}
          isSpeaking={isSpeaking}
          isLoading={isLoading}
          transcript={transcript}
          language={language}
          onLanguageChange={handleLanguageChange}
          onClose={handleCloseChat}
        />
      )}
    </div>
  );
};

export default AIAssistant;
