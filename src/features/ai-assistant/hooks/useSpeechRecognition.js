import { useState, useCallback, useRef } from "react";

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-IN");
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  const startListening = useCallback(() => {
    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setError("Speech Recognition not supported in this browser");
        return;
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.language = language;
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript("");
        setError(null);
      };

      recognition.onresult = (event) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            setTranscript(transcript);
          } else {
            interimTranscript += transcript;
          }
        }
      };

      recognition.onerror = (event) => {
        setError(`Error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setError(err.message);
      setIsListening(false);
    }
  }, [language]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setError(null);
  }, []);

  return {
    transcript,
    isListening,
    language,
    setLanguage,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
};

export default useSpeechRecognition;
