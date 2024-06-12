import FormattedTime from "@/components/FormattedTime.tsx";
import Collapse from "@/components/ui/collapse";
import { AttemptData } from "@/lib/attempt-data.ts";
import { ContextModalProps } from "@mantine/modals";

const SingleAttemptModal = ({
  innerProps,
}: ContextModalProps<{ attempt: AttemptData }>) => {
  const { totalResultMs, unixDate, event, scramble } = innerProps.attempt;
  return (
    <>
      <div className="flex flex-col gap-3 py-2 text-xl">
        <FormattedTime className="text-center text-3xl" time={totalResultMs} />
        <Collapse title="Scramble">
          <div className="font-mono">{scramble || "No Scramble"}</div>
        </Collapse>
        <p>Date: {new Date(unixDate).toLocaleString()}</p>
        <p>Event: {event}</p>
      </div>
    </>
  );
};

export default SingleAttemptModal;
