import { Button } from "@nextui-org/button";
import PouchDb from "pouchdb-browser";
import { useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { SessionType } from "./lib/useSession";
import { useSettings } from "./lib/useSettings";

function Settings({ session }: { session: SessionType }) {
  const {
    offlineReady: [offlineReady],
    // needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({});
  //   const [remoteDB, setRemoteDB] = useState("");
  const {
    remoteDB: [remoteDB, setRemoteDB],
  } = useSettings();
  const [syncMessage, setSyncMessage] = useState("");
  return (
    <div className="space-y-2 divide-y-2 px-4 text-lg sm:text-2xl">
      <div>Offline Ready: {offlineReady ? "Yes" : "No"}</div>
      <div>
        <Button
          className="text-lg sm:text-2xl"
          onClick={() => updateServiceWorker(true)}
        >
          Reload
        </Button>
      </div>
      <div>
        Remote DB:{" "}
        <input
          type="text"
          value={remoteDB}
          className="w-full rounded-md outline outline-2 outline-default-400"
          onChange={(e) => setRemoteDB(e.target.value)}
        />
        <Button
          className=" block text-lg sm:text-2xl"
          onClick={async () => {
            try {
              await PouchDb.sync("sessions", remoteDB + "/sessions");
              setSyncMessage("Syncing...");
              session.loadFromDB();
              await Promise.all(
                session.sessions.map((s) => {
                  return PouchDb.sync(
                    "session_" + s._id,
                    remoteDB + "/session_" + s._id,
                  );
                }),
              );
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
    </div>
  );
}

export default Settings;
