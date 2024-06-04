import { getSetting, setSetting } from "@/lib/settings";
import { SessionType } from "@/lib/useSession";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
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
      <Accordion
        isCompact={true}
        itemClasses={{
          title: "text-2xl",
        }}
      >
        <AccordionItem
          title="Remote Database"
          classNames={{
            content: "space-y-2",
          }}
        >
          <Textarea
            classNames={{
              base: "px-0",
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
        </AccordionItem>
      </Accordion>
      {needRefresh && (
        <Button onPress={() => updateServiceWorker(true)}>Reload</Button>
      )}
    </div>
  );
}

export default Settings;
