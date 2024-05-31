import { EventID, eventList } from "@/lib/events";
import { SessionType } from "@/lib/useSession";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

function EventSwitch({ session }: { session: SessionType }) {
  return (
    <div className="flex justify-center">
      <Dropdown className="shadow-lg">
        <DropdownTrigger>
          <Button
            variant="bordered"
            radius="sm"
            className="bg-content1 text-center text-2xl"
          >
            {session.currentSession?.event}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Event switcher"
          variant="flat"
          onAction={(key) => {
            session.changeEvent(key as EventID);
          }}
          className="rounded"
        >
          {eventList.map((event) => (
            <DropdownItem
              key={event}
              aria-label={event}
              className={cn({
                "text-primary": event === session.currentSession?.event,
              })}
            >
              <div className="text-center text-2xl">{event}</div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default EventSwitch;
