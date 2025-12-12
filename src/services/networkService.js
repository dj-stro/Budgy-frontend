import { Network } from "@capacitor/network";

/**
 * Callback function you can set from anywhere in the app.
 * It will run automatically when the device goes online.
 */
let onReconnectCallback = null;

/**
 * Register a function to be called when the device reconnects.
 */
export const registerOnReconnect = (callback) => {
  onReconnectCallback = callback;
};

/**
 * Initialize network listener.
 * Call this ONCE in App.jsx.
 */
export const initNetworkService = () => {
  console.log("[NetworkService] Initializing network listener…");

  Network.addListener("networkStatusChange", (status) => {
    console.log("[NetworkService] Network changed:", status);

    if (status.connected) {
      console.log("[NetworkService] Device is online!");

      if (typeof onReconnectCallback === "function") {
        onReconnectCallback(); // Trigger your sync logic
      }
    }
  });

  // Optional: check status at startup
  Network.getStatus().then((status) => {
    console.log("[NetworkService] Initial status:", status.connected);
  });
};
