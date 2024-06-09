import { getSetting, setSetting } from "@/lib/settings";
import { useSession } from "@/session/useSession";
import { Button, TextInput, TextInputProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "lucide-react";
import PouchDb from "pouchdb-browser";
import React, { useContext, useState } from "react";

type ContextType = {
  remoteDB: string;
  setRemoteDB: React.Dispatch<React.SetStateAction<string>>;
};

const RemoteDbContext = React.createContext<ContextType | undefined>(undefined);

export const SyncProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [remoteDB, setRemoteDB] = useState(getSetting("remoteDB") || "");
  return (
    <RemoteDbContext.Provider value={{ remoteDB, setRemoteDB }}>
      {children}
    </RemoteDbContext.Provider>
  );
};

export const RemoteDbInput: React.FC<TextInputProps> = ({ className }) => {
  const { remoteDB, setRemoteDB } = useContext(RemoteDbContext)!;
  return (
    <TextInput
      label="Sync database address"
      className={className}
      classNames={{
        input: "text-lg",
      }}
      placeholder="Remote DB Address"
      value={remoteDB}
      onChange={(e) => {
        setSetting("remoteDB", e.target.value);
        setRemoteDB(e.target.value);
      }}
    />
  );
};

export const SyncButton: React.FC = () => {
  const { remoteDB } = useContext(RemoteDbContext)!;
  const { loadFromDB } = useSession();
  const [syncingState, setSyncingState] = useState("done");

  return (
    <Button
      loading={syncingState === "syncing"}
      className="block text-lg"
      rightSection={
        syncingState === "success" ? (
          <Check />
        ) : syncingState === "failed" ? (
          <X />
        ) : undefined
      }
      color={
        syncingState === "success"
          ? "green"
          : syncingState === "failed"
            ? "red"
            : "blue"
      }
      onClick={async () => {
        try {
          setSyncingState("syncing");
          await PouchDb.sync("data", remoteDB + "/data");
          loadFromDB();
          setSyncingState("success");
          setTimeout(() => setSyncingState("done"), 2000);
        } catch (e) {
          setSyncingState("failed");
          setTimeout(() => setSyncingState("done"), 2000);
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
  );
};
