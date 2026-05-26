import { useCallback, useState } from "react";
import aiService from "../services/aiService";
import useSpeechRecognition from "./useSpeechRecognition";
import useSpeechSynthesis from "./useSpeechSynthesis";

const useAIChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");

  const speechRecognition = useSpeechRecognition();
  const speechSynthesis = useSpeechSynthesis();

  // Update language across all modules
  const handleLanguageChange = useCallback(
    (newLanguage) => {
      setLanguage(newLanguage);
      const languageMap = {
        en: "en-IN",
        hi: "hi-IN",
        mr: "mr-IN",
      };
      speechRecognition.setLanguage(languageMap[newLanguage]);
      speechSynthesis.setLanguage(languageMap[newLanguage]);
    },
    [speechRecognition, speechSynthesis],
  );

  const sendMessage = useCallback(
    async (userMessage) => {
      if (!userMessage.trim()) return;

      setError(null);
      setIsLoading(true);

      // Add user message to chat
      const newMessage = {
        id: Date.now(),
        type: "user",
        text: userMessage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);

      try {
        // Send to backend
        const response = await aiService.sendMessage(userMessage, language);

        // Add AI response to chat
        const aiMessage = {
          id: Date.now() + 1,
          type: "ai",
          text:
            response.reply ||
            response.response ||
            "I could not understand that.",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);

        // Speak the response
        speechSynthesis.speak(aiMessage.text);

        return aiMessage;
      } catch (err) {
        const errorMessage = "Sorry, I encountered an error. Please try again.";
        setError(err.message);

        // Add error message to chat
        const errorMsg = {
          id: Date.now() + 1,
          type: "ai",
          text: errorMessage,
          isError: true,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMsg]);
        speechSynthesis.speak(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [language, speechSynthesis],
  );

  const handleVoiceInput = useCallback(() => {
    if (speechRecognition.isListening) {
      speechRecognition.stopListening();

      if (speechRecognition.transcript.trim()) {
        sendMessage(speechRecognition.transcript);
        speechRecognition.resetTranscript();
      }
    } else {
      speechRecognition.startListening();
    }
  }, [speechRecognition, sendMessage]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    speechRecognition.resetTranscript();
  }, [speechRecognition]);

  return {
    messages,
    isLoading,
    error,
    language,
    handleLanguageChange,
    sendMessage,
    handleVoiceInput,
    clearChat,
    transcript: speechRecognition.transcript,
    isListening: speechRecognition.isListening,
    isSpeaking: speechSynthesis.isSpeaking,
    speechRecognition,
    speechSynthesis,
  };
};

export default useAIChat;
