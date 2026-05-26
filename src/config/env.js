// Frontend Environment Configuration
// File: src/config/env.js

export const API_BASE_URL = "http://localhost:8080";

// Razorpay Configuration
export const RAZORPAY_KEY_ID = "rzp_test_SteHZcq9L88UIY";

// AI Assistant Configuration
export const AI_CONFIG = {
  API_URL: `${API_BASE_URL}/api/ai`,
  TIMEOUT: 30000,
  DEBUG: true,
};

// Feature Flags
export const FEATURES = {
  VOICE_INPUT: true,
  TEXT_INPUT: true,
  LANGUAGE_SELECTOR: true,
};

// Default Language (en | hi | mr)
export const DEFAULT_LANGUAGE = "en";

// API Endpoints
export const API_ENDPOINTS = {
  CHAT: `${API_BASE_URL}/api/ai/chat`,
  HEALTH: `${API_BASE_URL}/api/ai/health`,
  LANGUAGES: `${API_BASE_URL}/api/ai/languages`,
};

// Environment
export const ENV = process.env.NODE_ENV || "development";

// Production vs Development
export const IS_PRODUCTION = ENV === "production";
export const IS_DEVELOPMENT = ENV === "development";

export default {
  API_BASE_URL,
  RAZORPAY_KEY_ID,
  AI_CONFIG,
  FEATURES,
  DEFAULT_LANGUAGE,
  API_ENDPOINTS,
  ENV,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
};
