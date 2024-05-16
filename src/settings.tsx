import { Button } from "@nextui-org/button";
import { useRegisterSW } from "virtual:pwa-register/react";

function Settings() {
  const {
    offlineReady: [offlineReady],
    // needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({});
  return (
    <div className="space-y-2 px-2 text-2xl">
      <div>Offline Ready: {offlineReady ? "Yes" : "No"}</div>
      <Button
        className="ReloadPrompt-toast-button"
        onClick={() => updateServiceWorker(true)}
      >
        Reload
      </Button>
    </div>
  );
}

export default Settings;
