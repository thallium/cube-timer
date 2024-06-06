import { ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Settings as IconSettings } from "lucide-react";
import Settings from "./settings";

const DesktopSettings = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <ActionIcon onClick={open} size="lg" variant="outline" color="gray.7">
        <IconSettings size={26} />
      </ActionIcon>
      <Modal
        centered
        opened={opened}
        onClose={close}
        padding="lg"
        title="Settings"
        classNames={{
          title: "text-2xl",
        }}
      >
        <Settings />
      </Modal>
    </>
  );
};

export default DesktopSettings;
