import { eventList } from "@/lib/events";
import { SessionType } from "@/lib/useSession";
import { cn } from "@/lib/utils";
import { Button, Menu } from "@mantine/core";

function EventSwitch({ session }: { session: SessionType }) {
  return (
    <div className="flex justify-center">
      <Menu>
        <Menu.Target>
          <Button
            variant="default"
            radius="md"
            color="gray.8"
            className="text-2xl font-normal"
          >
            {session.currentSession?.event}
          </Button>
        </Menu.Target>
        <Menu.Dropdown
          aria-label="Event switcher"
          variant="flat"
          className="rounded"
        >
          {eventList.map((event) => (
            <Menu.Item
              key={event}
              aria-label={event}
              className={cn("text-center text-2xl", {
                "text-primary": event === session.currentSession?.event,
              })}
              onClick={() => session.changeEvent(event)}
            >
              {event}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default EventSwitch;
