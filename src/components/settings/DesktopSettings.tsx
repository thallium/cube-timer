import { ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Settings as IconSettings } from "lucide-react";
import { RemoteDbInput, SyncButton, SyncProvider } from "./Sync";
import UpdateSW from "./UpdateSW";

const DesktopSettings = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <ActionIcon onClick={open} size="lg" variant="default">
        <IconSettings size={26} />
      </ActionIcon>
      <Modal
        centered
        opened={opened}
        onClose={close}
        padding="lg"
        size="xl"
        title="Settings"
        classNames={{
          body: "flex flex-col gap-4",
          title: "text-2xl",
        }}
      >
        <SyncProvider>
          <div className="flex items-end justify-between gap-2">
            <RemoteDbInput className="grow" />
            <SyncButton />
          </div>
        </SyncProvider>
        <UpdateSW />
      </Modal>
    </>
  );
};

export default DesktopSettings;
