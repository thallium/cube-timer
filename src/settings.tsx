import { useRegisterSW } from "virtual:pwa-register/react";

function Settings() {
  const {
    offlineReady: [offlineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({});
  return (
    <div className="px-2 text-2xl">
      <div>Offline Ready: {offlineReady ? "Yes" : "No"}</div>
      {needRefresh && (
        <button
          className="ReloadPrompt-toast-button"
          onClick={() => updateServiceWorker(true)}
        >
          Reload
        </button>
      )}
    </div>
  );
}

export default Settings;
