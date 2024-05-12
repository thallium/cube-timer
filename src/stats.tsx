import { AttemptData } from "./lib/attempt-data";
import { timeParts } from "./lib/stats";
import { cn } from "./lib/utils";
import SessionSwitch from "./session-switch";
import { Session } from "./lib/useSession";
import { X } from "lucide-react";
import { Button } from "@nextui-org/button";

function Stats({
  className,
  attempts,
  currentSession,
  sessions,
  changeSession,
  createSession,
  deleteAttempt,
}: {
  className?: string;
  attempts: AttemptData[];
  currentSession: Session | undefined;
  sessions: Session[];
  changeSession: (name: string) => void;
  createSession: (name: string) => void;
  deleteAttempt: (id: string) => void;
}) {
  return (
    <div
      className={cn(className, "hidden overflow-y-scroll max-h-lvh sm:block")}
    >
      <SessionSwitch
        sessions={sessions}
        currentSession={currentSession}
        changeSession={changeSession}
        createSession={createSession}
      />
      {attempts.toReversed().map((row) => {
        const { _id, totalResultMs } = row;
        const { secRest, decimals } = timeParts(totalResultMs);
        return (
          <div className="flex flex-row items-center my-2 justify-center">
            <div key={_id} className="text-center text-2xl">
              {`${secRest}.${decimals}`}
            </div>
            <Button
              isIconOnly
              variant="light"
              onClick={() => deleteAttempt(_id)}
            >
              <X />
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default Stats;
