import { Button } from "@nextui-org/button";
import PouchDb from "pouchdb-browser";
import { useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

function Settings() {
  const {
    offlineReady: [offlineReady],
    // needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({});
  const [remoteDB, setRemoteDB] = useState("");
  return (
    <div className="space-y-2 divide-y-2 px-4 text-2xl">
      <div>Offline Ready: {offlineReady ? "Yes" : "No"}</div>
      <div>
        <Button className="text-2xl" onClick={() => updateServiceWorker(true)}>
          Reload
        </Button>
      </div>
      <div>
        Remote DB:{" "}
        <input
          type="text"
          value={remoteDB}
          className="rounded-md outline outline-2 outline-default-400"
          onChange={(e) => setRemoteDB(e.target.value)}
        />
        <Button
          className="inline-block text-2xl"
          onClick={() => {
            PouchDb.sync("sessions", "http://admin:password@arm:5900/sessions");
          }}
        >
          Sync
        </Button>
      </div>
    </div>
  );
}

export default Settings;
