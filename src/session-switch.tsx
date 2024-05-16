import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SessionType } from "./lib/useSession";

function SessionSwitch({ session }: { session: SessionType }) {
  const [newSessionName, setNewSessionName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { currentSession, createSession, changeSession, sessions } = session;

  return (
    <div className="flex justify-center pb-2">
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
              textValue={session._id}
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
            <input
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
              className="h-10 w-32 rounded-md px-2 text-xl outline outline-2 outline-default-400"
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
