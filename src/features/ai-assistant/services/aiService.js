import axios from "axios";
import { AI_CONFIG, API_ENDPOINTS } from "../../../config/env";

// Create axios instance with configuration
const aiClient = axios.create({
  baseURL: API_ENDPOINTS.CHAT.replace("/chat", ""),
  timeout: AI_CONFIG.TIMEOUT,
});

const aiService = {
  /**
   * Send message to AI backend
   * @param {string} message - User message
   * @param {string} language - Language code (en|hi|mr)
   * @returns {Promise} - AI response
   */
  sendMessage: async (message, language = "en") => {
    try {
      if (!message || !message.trim()) {
        throw new Error("Message cannot be empty");
      }

      console.log("[AI Service] Sending message:", {
        message,
        language,
        endpoint: API_ENDPOINTS.CHAT,
      });

      const response = await aiClient.post(
        "/chat",
        {
          message: message.trim(),
          language,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("[AI Service] Response received:", response.data);
      return response.data;
    } catch (error) {
      console.error("[AI Service] Error:", error.message);

      // Handle different error types
      if (error.response) {
        // Server responded with error status
        throw {
          message: error.response.data?.message || "Server error",
          status: error.response.status,
          data: error.response.data,
        };
      } else if (error.request) {
        // Request made but no response
        throw {
          message: "No response from server. Is the backend running?",
          type: "network_error",
        };
      } else {
        // Request setup error
        throw {
          message: error.message,
          type: "error",
        };
      }
    }
  },

  /**
   * Check if AI service is available
   * @returns {Promise<boolean>}
   */
  healthCheck: async () => {
    try {
      const response = await aiClient.get("/health");
      return response.status === 200;
    } catch (error) {
      console.error("[AI Service] Health check failed:", error.message);
      return false;
    }
  },

  /**
   * Get available languages
   * @returns {Promise<Array>}
   */
  getAvailableLanguages: async () => {
    try {
      const response = await aiClient.get("/languages");
      return response.data || [];
    } catch (error) {
      console.error("[AI Service] Failed to fetch languages:", error.message);
      return ["en", "hi", "mr"]; // Fallback
    }
  },

  /**
   * Get system prompt for AI
   * @returns {string}
   */
  getSystemPrompt: () => {
    return `You are ScrapSavvy AI Voice Assistant. You help customers with:
- Scrap pickup scheduling and booking
- Recycling information and best practices
- Pricing and quotes for scrap materials
- Order tracking and status updates
- General questions about our services

Guidelines:
- Always be helpful, friendly, and professional
- Support multiple languages (English, Hindi, Marathi)
- Reply in the same language as the user
- Keep responses concise and action-oriented
- For scrap pickup: Ask location, what type of scrap, and preferred date/time
- If you don't know something, suggest contacting customer support`;
  },

  /**
   * Format language options for UI
   * @returns {Array}
   */
  getLanguageOptions: () => {
    return [
      { code: "en", name: "English", locale: "en-IN", flag: "🇬🇧" },
      { code: "hi", name: "हिंदी", locale: "hi-IN", flag: "🇮🇳" },
      { code: "mr", name: "मराठी", locale: "mr-IN", flag: "🇮🇳" },
    ];
  },
  /**
   * Log debug information
   * @param {string} action - Action name
   * @param {object} data - Data to log
   */
  log: (action, data) => {
    if (AI_CONFIG.DEBUG) {
      console.log(`[AI Service] ${action}:`, data);
    }
  },
};

export default aiService;
