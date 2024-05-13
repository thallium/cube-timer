import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Session } from "./lib/useSession";
import { Plus } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Input } from "@nextui-org/input";
import { useState } from "react";

function SessionSwitch({
  currentSession,
  sessions,
  changeSession,
  createSession,
}: {
  currentSession: Session | undefined;
  sessions: Session[];
  changeSession: (name: string) => void;
  createSession: (name: string) => void;
}) {
  const [newSessionName, setNewSessionName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <Dropdown className="shadow-lg">
        <DropdownTrigger>
          <Button variant="bordered" className="text-2xl">
            {currentSession?._id}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Session switcher"
          variant="flat"
          onAction={(key) => {
            changeSession(key as string);
          }}
          items={sessions}
        >
          {(session) => (
            <DropdownItem
              key={session._id}
              className={
                session._id === currentSession?._id ? "text-primary" : ""
              }
            >
              <div className="text-center text-2xl">{session._id}</div>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <Popover
        placement="bottom"
        showArrow={true}
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <PopoverTrigger>
          <Button isIconOnly variant="light">
            <Plus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="shadow-lg">
          <div className="flex items-center justify-center p-2">
            <Input
              variant="bordered"
              size="md"
              type="text"
              value={newSessionName}
              onValueChange={setNewSessionName}
            />
            <Button
              variant="light"
              onClick={() => {
                createSession(newSessionName);
                setNewSessionName("");
                setIsOpen(false);
              }}
              className="text-xl"
            >
              Create
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SessionSwitch;
