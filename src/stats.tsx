import { AttemptData } from "./lib/attempt-data";
import { timeParts } from "./lib/stats";
import { cn } from "./lib/utils";
import SessionSwitch from "./session-switch";
// import { useSession } from "./sessions/sessionProvider";
import { Session } from "./lib/useSession";

function Stats({
  className,
  attempts,
  currentSession,
  sessions,
  changeSession,
  createSession,
}: {
  className: string;
  attempts: AttemptData[];
  currentSession: Session | undefined;
  sessions: Session[];
  changeSession: (name: string) => void;
  createSession: (name: string) => void;
}) {
  // const { currentSession } = useSession();
  // const { rows } = useAllDocs({ include_docs: true });
  // const { attempts, currentSession } = useSession();

  return (
    <div
      className={cn(
        className,
        "overflow-y-scroll max-h-lvh py-2",
        "session_" + currentSession?._id
      )}
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
          <div key={_id} className="text-center text-2xl my-2">
            {`${secRest}.${decimals}`}
          </div>
        );
      })}
    </div>
  );
}

export default Stats;
