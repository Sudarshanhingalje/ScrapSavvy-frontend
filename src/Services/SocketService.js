import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const connectSocket = (onMessageReceived) => {
  const socket = new SockJS("http://localhost:8080/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,

    reconnectDelay: 5000,

    debug: (str) => {
      console.log(str);
    },

    onConnect: () => {
      console.log("✅ WebSocket Connected");
      const ownerId = localStorage.getItem("userId");
      // LIVE PRICES
      stompClient.subscribe(`/topic/inventory/${ownerId}`, (message) => {
        const data = JSON.parse(message.body);
        onMessageReceived("inventory", data);
      });

      stompClient.subscribe(`/topic/transactions/${ownerId}`, (message) => {
        const data = JSON.parse(message.body);
        onMessageReceived("transactions", data);
      });

      stompClient.subscribe(`/topic/orders/${ownerId}`, (message) => {
        const data = JSON.parse(message.body);
        onMessageReceived("orders", data);
      });

      stompClient.subscribe(`/topic/prices/${ownerId}`, (message) => {
        const data = JSON.parse(message.body);
        onMessageReceived("prices", data);
      });
    },

    onStompError: (frame) => {
      console.error("Broker error:", frame.headers["message"]);
    },

    onWebSocketError: (err) => {
      console.error("WebSocket error", err);
    },
  });

  stompClient.activate();
};

export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};
