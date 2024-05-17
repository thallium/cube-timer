import { Button } from "@nextui-org/button";
import { useRegisterSW } from "virtual:pwa-register/react";

function Settings() {
  const {
    offlineReady: [offlineReady],
    // needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({});
  return (
    <div className="space-y-2 divide-y-2 px-4 text-2xl">
      <div>Offline Ready: {offlineReady ? "Yes" : "No"}</div>
      <div>
        <Button
          className="ReloadPrompt-toast-button text-2xl"
          onClick={() => updateServiceWorker(true)}
        >
          Reload
        </Button>
      </div>
      <div>
        Remote DB:{" "}
        <input
          type="text"
          className="rounded-md outline outline-2 outline-default-400"
        />
      </div>
    </div>
  );
}

export default Settings;
