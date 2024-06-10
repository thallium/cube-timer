import { ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Settings as IconSettings } from "lucide-react";
import { RemoteDbInput, SyncButton } from "./Sync";
import ThemeButtons from "./ThemeButtons";
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
          body: "flex flex-col gap-4 text-lg",
          title: "text-2xl",
        }}
      >
        <div className="flex items-end justify-between gap-2">
          <RemoteDbInput className="grow" />
          <SyncButton />
        </div>
        <UpdateSW />
        <div className="flex items-center justify-between">
          <p>Theme</p>
          <ThemeButtons />
        </div>
      </Modal>
    </>
  );
};

export default DesktopSettings;
