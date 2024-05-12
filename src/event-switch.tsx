import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Session } from "./lib/useSession";
import { EventID, eventList } from "./lib/events";

function EventSwitch({
  currentSession,
  changeEvent,
}: {
  currentSession: Session | undefined;
  changeEvent: (name: EventID) => void;
}) {
  return (
    <div className="flex justify-center">
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className=" text-center text-2xl bg-content1"
          >
            {currentSession?.event}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Event switcher"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={(keys) => {
            changeEvent(Array.from(keys).at(0) as EventID);
          }}
        >
          {eventList.map((event) => (
            <DropdownItem key={event} aria-label={event}>
              <div className="text-2xl text-center">{event}</div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default EventSwitch;
