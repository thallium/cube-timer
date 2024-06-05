import Collapse from "@/components/ui/collapse";
import { getSetting, setSetting } from "@/lib/settings";
import { SessionType } from "@/lib/useSession";
import { Button, Textarea } from "@mantine/core";
import PouchDb from "pouchdb-browser";
import { useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

function Settings({ session }: { session: SessionType }) {
  const [syncMessage, setSyncMessage] = useState("");
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

  return (
    <div className="px-4">
      <h1 className="my-4 text-4xl">Settings</h1>
      <Collapse title="Remote Database" className="text-xl">
        <div className=" space-y-2 py-2">
          <Textarea
            classNames={{
              input: "text-2xl",
            }}
            placeholder="Remote DB Address"
            value={remoteDB}
            onChange={(e) => {
              setSetting("remoteDB", e.target.value);
              setRemoteDB(e.target.value);
            }}
          />
          <Button
            className=" block text-lg sm:text-2xl"
            onClick={async () => {
              try {
                setSyncMessage("Syncing...");
                await PouchDb.sync("data", remoteDB + "/data");
                session.loadFromDB();
                setSyncMessage("Synced");
                setTimeout(() => setSyncMessage(""), 3000);
              } catch (e) {
                setSyncMessage("Error syncing: " + e);
                setTimeout(() => setSyncMessage(""), 5000);
              }
            }}
          >
            Sync
          </Button>
          <div>{syncMessage}</div>
        </div>
      </Collapse>
      {needRefresh && (
        <Button onClick={() => updateServiceWorker(true)}>Reload</Button>
      )}
    </div>
  );
}

export default Settings;
