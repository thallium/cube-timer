import { Session } from "@/session/index";
import { useSession } from "@/session/useSession";
import { ActionIcon, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical, Trash2 } from "lucide-react";
import React from "react";
import CreateSession from "./CreateSession";

interface SessionItemProps {
  session: Session;
  isCurrent: boolean;
  closeSwitcher: () => void;
}
const SessionItem: React.FC<SessionItemProps> = ({
  session,
  isCurrent,
  closeSwitcher,
}) => {
  const dragControls = useDragControls();
  const [opened, { open, close }] = useDisclosure(false);
  const { changeSession, deleteSession } = useSession();

  return (
    <Reorder.Item
      value={session}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-center"
      initial={false}
    >
      <Button
        variant="subtle"
        fullWidth
        color={isCurrent ? "" : "dark"}
        classNames={{
          inner: "text-2xl font-normal justify-start",
        }}
        onClick={() => {
          changeSession(session.name);
          closeSwitcher();
        }}
      >
        {session.name}
      </Button>
      <ActionIcon variant="subtle" color="dark" onClick={open}>
        <Trash2 />
      </ActionIcon>
      <GripVertical
        className=" cursor-grab"
        onPointerDown={(e) => dragControls.start(e)}
      />
      <Modal
        opened={opened}
        onClose={close}
        title="Warning"
        classNames={{
          title: "text-large font-semibold",
        }}
        radius="lg"
      >
        <div className="text-xl">
          Do you really want to delete this session? Results in this session
          will also be deleted.
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            color="red"
            variant="outline"
            onClick={() => {
              deleteSession(session.name);
              close();
            }}
          >
            Yes
          </Button>
          <Button onClick={close}>No</Button>
        </div>
      </Modal>
    </Reorder.Item>
  );
};

interface SessionSwitchProps {}

const SessionSwitch: React.FC<SessionSwitchProps> = () => {
  const { currentSession, sessions, setSessions } = useSession();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="flex justify-center pb-2">
      <Button
        variant="default"
        className="text-2xl font-normal"
        color="gray"
        onClick={open}
      >
        {currentSession?.name}
      </Button>
      <Modal
        centered
        radius="lg"
        opened={opened}
        onClose={close}
        title="Sessions"
        padding="lg"
        classNames={{
          title: "text-large font-semibold",
        }}
      >
        <div className="text-xl">
          <Reorder.Group
            onReorder={setSessions}
            values={sessions}
            initial={false}
          >
            {sessions.map((session) => (
              <SessionItem
                key={session.name}
                session={session}
                isCurrent={currentSession?.name === session.name}
                closeSwitcher={close}
              />
            ))}
          </Reorder.Group>
        </div>
        <div className="mt-4 flex flex-row-reverse">
          <CreateSession />
        </div>
      </Modal>
    </div>
  );
};

export default SessionSwitch;
