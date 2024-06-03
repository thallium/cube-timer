import { SessionType } from "@/lib/useSession";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { useState } from "react";

interface CreateSessionProps {
  session: SessionType;
}

const CreateSession: React.FC<CreateSessionProps> = ({ session }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newSessionName, setNewSessionName] = useState("");
  return (
    <>
      <Button variant="bordered" className="text-lg" onPress={onOpen}>
        New Session
      </Button>
      <Modal placement="top" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Sessions
              </ModalHeader>
              <ModalBody className="text-xl">
                <Input
                  autoFocus
                  variant="flat"
                  label="Session Name"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="bordered"
                  className="text-lg"
                  onPress={() => {
                    session.createSession(newSessionName);
                    onClose();
                  }}
                >
                  Create Session
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateSession;
