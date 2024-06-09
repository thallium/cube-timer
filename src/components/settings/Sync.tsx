import { getSetting, setSetting } from "@/lib/settings";
import { useSession } from "@/session/useSession";
import { Button, TextInput, TextInputProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, X } from "lucide-react";
import React, { useState } from "react";

export const RemoteDbInput: React.FC<TextInputProps> = ({ className }) => {
  const [remoteDB, setRemoteDB] = useState(getSetting("remoteDB") || "");
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
  const { syncWithRemoteDB } = useSession();
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
          await syncWithRemoteDB();
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
