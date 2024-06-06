import { useSession } from "@/session/useSession";
import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";

interface CreateSessionProps {}

const CreateSession: React.FC<CreateSessionProps> = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [newSessionName, setNewSessionName] = useState("");
  const { createSession } = useSession();
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
              createSession(newSessionName);
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
