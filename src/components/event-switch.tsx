import { eventList } from "@/lib/events";
import { SessionType } from "@/lib/useSession";
import { Button, Menu, useMantineTheme } from "@mantine/core";

function EventSwitch({ session }: { session: SessionType }) {
  const theme = useMantineTheme();

  return (
    <div className="flex justify-center">
      <Menu radius="lg">
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
              className="text-2xl"
              color={
                event === session.currentSession?.event
                  ? theme.primaryColor
                  : undefined
              }
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
