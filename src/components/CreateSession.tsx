import { SessionType } from "@/lib/useSession";
import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";

interface CreateSessionProps {
  session: SessionType;
}

const CreateSession: React.FC<CreateSessionProps> = ({ session }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [newSessionName, setNewSessionName] = useState("");
  return (
    <>
      <Button variant="outline" className="text-lg" onClick={open}>
        New Session
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Sessions"
        radius="lg"
        classNames={{
          title: "text-large font-semibold",
        }}
      >
        <div className="text-xl">
          <TextInput
            autoFocus
            radius="md"
            size="md"
            label="Session Name"
            value={newSessionName}
            onChange={(e) => setNewSessionName(e.target.value)}
          />
          <Button
            variant="bordered"
            className="mt-4 text-lg"
            onClick={() => {
              session.createSession(newSessionName);
              close();
            }}
          >
            Create Session
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateSession;
