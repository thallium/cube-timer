import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRegisterSW } from "virtual:pwa-register/react";

const UpdateSW = () => {
  const {
    // offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(error) {
      notifications.show({ message: "SW registration error" + error });
    },
  });
  return needRefresh ? (
    <div className="flex items-center justify-between text-lg">
      <p>Update available. Click the button to reload the app.</p>
      <Button onClick={() => updateServiceWorker(true)}>Reload</Button>
    </div>
  ) : (
    <p className="text-lg">Service Worker is up to date.</p>
  );
};

export default UpdateSW;
