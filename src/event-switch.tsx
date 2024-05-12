import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Session } from "./lib/useSession";
import { EventID, eventList } from "./lib/events";
import { cn } from "./lib/utils";

function EventSwitch({
  currentSession,
  changeEvent,
}: {
  currentSession: Session | undefined;
  changeEvent: (name: EventID) => void;
}) {
  return (
    <div className="flex justify-center">
      <Dropdown className="shadow-lg">
        <DropdownTrigger>
          <Button
            variant="bordered"
            radius="sm"
            className=" text-center text-2xl bg-content1"
          >
            {currentSession?.event}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Event switcher"
          variant="flat"
          onAction={(key) => {
            changeEvent(key as EventID);
          }}
          className="rounded"
        >
          {eventList.map((event) => (
            <DropdownItem
              key={event}
              aria-label={event}
              className={cn({
                "text-primary": event === currentSession?.event,
              })}
            >
              <div className="text-2xl text-center">{event}</div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default EventSwitch;
