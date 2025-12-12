import { Network, NetworkStatus, PluginListenerHandle } from "@capacitor/network";

type ReconnectCallback = () => void;
let onReconnectCallback: ReconnectCallback | null = null;
/**
 * Register a function to be called when the device reconnects.
 */

let networkListener: PluginListenerHandle | null = null;

export const registerOnReconnect = (callback: ReconnectCallback): void => {
  onReconnectCallback = callback;
};

/**
 * Initialize network listener.
 * Call this ONCE in App.jsx.
 */
export const initNetworkService = (): void => {
  console.log("[NetworkService] Initializing network listener…");

  Network.addListener("networkStatusChange", (status) => {
    console.log("[NetworkService] Network changed:", status);

    if (networkListener) {
      // Remove existing listener before adding a new one (Optional, but good cleanup)
      networkListener.remove();
    }

    networkListener = Network.addListener("networkStatusChange", (status: NetworkStatus) => {
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
  });
};

export const destroyNetworkService = (): void => {
    if (networkListener) {
        networkListener.remove();
        networkListener = null;
        console.log("[NetworkService] Listener destroyed.");
    }
}