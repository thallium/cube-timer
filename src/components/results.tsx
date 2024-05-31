import { SessionType } from "../lib/useSession";
import { cn } from "../lib/utils";
import AttemptRow from "./AttemptRow";

function Results({
  className,
  session,
}: {
  className?: string;
  session: SessionType;
}) {
  return (
    <>
      <div
        className={cn(className, "flex flex-col justify-start overflow-hidden")}
      >
        <div className="no-scrollbar divide-y-1 overflow-y-scroll">
          {session.attempts
            .map((row, index) => (
              <AttemptRow row={row} index={index} session={session} />
            ))
            .toReversed()}
        </div>
      </div>
    </>
  );
}

export default Results;
