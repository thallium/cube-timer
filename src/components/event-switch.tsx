import { eventList } from "@/lib/events";
import { useSession } from "@/session/useSession";
import { Button, Menu, useMantineTheme } from "@mantine/core";

function EventSwitch() {
  const theme = useMantineTheme();
  const { currentSession, changeEvent } = useSession();

  return (
    <div className="flex justify-center">
      <Menu radius="lg">
        <Menu.Target>
          <Button
            variant="default"
            radius="md"
            className="text-2xl font-normal"
          >
            {currentSession?.event}
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
              className="text-2xl"
              c={event === currentSession?.event ? theme.primaryColor : "text"}
              onClick={() => changeEvent(event)}
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
