import { useCallback, useState } from "react";

const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState("en-IN");

  const speak = useCallback(
    (text) => {
      if (!text) return;

      // Stop any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Map language codes to voices
      const languageVoiceMap = {
        "en-IN": "en-IN",
        "hi-IN": "hi-IN",
        "mr-IN": "mr-IN",
      };

      utterance.lang = languageVoiceMap[language] || "en-IN";
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [language],
  );

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    language,
    setLanguage,
  };
};

export default useSpeechSynthesis;
