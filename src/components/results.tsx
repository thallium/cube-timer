import { AnimatePresence } from "framer-motion";
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
        <div className="no-scrollbar overflow-y-scroll">
          <AnimatePresence initial={false}>
            {session.attempts
              .filter((a) => a.session === session.currentSession!.name)
              .map((row, index) => (
                <AttemptRow
                  key={row._id}
                  row={row}
                  index={index}
                  session={session}
                />
              ))
              .toReversed()}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Results;
