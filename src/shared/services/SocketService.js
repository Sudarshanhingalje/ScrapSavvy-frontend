import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const connectSocket = (onMessageReceived) => {
  const socket = new SockJS("http://localhost:8080/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,

    reconnectDelay: 5000,

    debug: () => {},

    onConnect: () => {
      console.log("✅ WebSocket Connected");

      const ownerId = localStorage.getItem("userId");

      const subscriptions = [
        {
          topic: `/topic/inventory/${ownerId}`,
          type: "inventory",
        },

        {
          topic: `/topic/transactions/${ownerId}`,
          type: "transactions",
        },

        {
          topic: `/topic/orders/${ownerId}`,
          type: "orders",
        },

        {
          topic: `/topic/prices/${ownerId}`,
          type: "prices",
        },
      ];

      subscriptions.forEach(({ topic, type }) => {
        stompClient.subscribe(topic, (message) => {
          const data = JSON.parse(message.body);

          onMessageReceived(type, data);
        });
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

export const disconnectSocket = async () => {
  if (stompClient) {
    await stompClient.deactivate();

    stompClient = null;

    console.log("❌ WebSocket Disconnected");
  }
};
