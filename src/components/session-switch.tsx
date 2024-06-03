import { Session, SessionType } from "@/lib/useSession";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { cn } from "@nextui-org/system";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical, Trash2 } from "lucide-react";
import React from "react";
import CreateSession from "./CreateSession";

interface SessionItemProps {
  session: Session;
  currentSession: SessionType["currentSession"];
  changeSession: SessionType["changeSession"];
  deleteSession: SessionType["deleteSession"];
  onClose: () => void;
}
const SessionItem: React.FC<SessionItemProps> = ({
  session,
  currentSession,
  changeSession,
  onClose,
  deleteSession,
}) => {
  const dragControls = useDragControls();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Reorder.Item
      value={session}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-center"
      initial={false}
    >
      <Button
        variant="light"
        className={cn("block w-full text-left text-2xl", {
          "text-primary": session.name === currentSession!.name,
        })}
        onPress={() => {
          changeSession(session.name);
          onClose();
        }}
      >
        {session.name}
      </Button>
      <Button
        isIconOnly
        variant="light"
        onPress={() => {
          onOpen();
        }}
      >
        <Trash2 />
      </Button>
      <GripVertical
        className=" cursor-grab"
        onPointerDown={(e) => dragControls.start(e)}
      />
      <Modal
        placement="top"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
              <ModalBody className="text-xl">
                Do you really want to delete this session? Results in this
                session will also be deleted.
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    deleteSession(session.name);
                    onClose();
                  }}
                >
                  Yes
                </Button>
                <Button color="primary" onPress={onClose}>
                  No
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Reorder.Item>
  );
};

interface SessionSwitchProps {
  session: SessionType;
}

const SessionSwitch: React.FC<SessionSwitchProps> = ({ session }) => {
  const {
    currentSession,
    changeSession,
    sessions,
    setSessions,
    deleteSession,
  } = session;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex justify-center pb-2">
      <Button
        variant="bordered"
        className="text-2xl"
        tabIndex={-1}
        onPress={onOpen}
      >
        {currentSession?.name}
      </Button>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Sessions
              </ModalHeader>
              <ModalBody className="text-xl">
                <Reorder.Group
                  onReorder={setSessions}
                  values={sessions}
                  initial={false}
                >
                  {sessions.map((session) => (
                    <SessionItem
                      key={session.name}
                      session={session}
                      currentSession={currentSession}
                      changeSession={changeSession}
                      onClose={onClose}
                      deleteSession={deleteSession}
                    />
                  ))}
                </Reorder.Group>
              </ModalBody>
              <ModalFooter>
                <CreateSession session={session} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SessionSwitch;
