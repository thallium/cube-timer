import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useSession } from "./lib/session";

function SessionSwitch() {
  const { currentSession, sessions, changeSession } = useSession();
  return (
    <div className="flex justify-center">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className=" w-max">
            {currentSession?._id}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={(keys) =>
            changeSession(Array.from(keys).at(0) as string)
          }
        >
          {sessions.map((session) => (
            <DropdownItem key={session._id}>{session._id}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default SessionSwitch;
