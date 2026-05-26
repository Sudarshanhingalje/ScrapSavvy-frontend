import axios from "axios";

import { BASEURL } from "../../shared/utils/Utils";

const api = axios.create({
  baseURL: BASEURL,
});

api.interceptors.request.use(
  (config) => {
    // ✅ DO NOT SEND TOKEN FOR PAYMENT APIs
    if (!config.url.includes("/payment/")) {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => Promise.reject(error),
);

export default api;
