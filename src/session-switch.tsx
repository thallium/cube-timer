import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Session } from "./lib/useSession";

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
  return (
    <div className="flex justify-center">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className=" w-max">
            {currentSession?._id}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Session switcher"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          className=" shadow-md rounded-md"
          onSelectionChange={(keys) => {
            changeSession(Array.from(keys).at(0) as string);
          }}
        >
          {sessions.map((session) => (
            <DropdownItem key={session._id}>{session._id}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Button onClick={() => createSession("test")}>new session</Button>
    </div>
  );
}

export default SessionSwitch;
