import Collapse from "@/components/ui/collapse";
import { getSetting, setSetting } from "@/lib/settings";
import { useSession } from "@/session/useSession";
import { Button, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import PouchDb from "pouchdb-browser";
import { useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

interface SettingsProps {
  className?: string;
}

const Settings: React.FC<SettingsProps> = ({ className }) => {
  const [remoteDB, setRemoteDB] = useState(getSetting("remoteDB") || "");
  const {
    // offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });
  const { loadFromDB } = useSession();

  return (
    <div className={className}>
      <Collapse title="Remote Database" className="text-xl">
        <div className=" space-y-2 py-2">
          <Textarea
            classNames={{
              input: "text-xl",
            }}
            placeholder="Remote DB Address"
            value={remoteDB}
            onChange={(e) => {
              setSetting("remoteDB", e.target.value);
              setRemoteDB(e.target.value);
            }}
          />
          <Button
            className="block text-lg"
            onClick={async () => {
              try {
                notifications.show({
                  title: "Start Syncing...",
                  message: "",
                });
                await PouchDb.sync("data", remoteDB + "/data");
                loadFromDB();
                notifications.show({
                  color: "green",
                  title: "Syncing successful",
                  message: "",
                });
              } catch (e) {
                notifications.show({
                  color: "red",
                  title: "Error syncing:",
                  message: e?.toString(),
                });
              }
            }}
          >
            Sync
          </Button>
        </div>
      </Collapse>
      {needRefresh && (
        <Button onClick={() => updateServiceWorker(true)}>Reload</Button>
      )}
    </div>
  );
};

export default Settings;
