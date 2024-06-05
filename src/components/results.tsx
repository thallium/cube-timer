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
  const attempts = session.attempts.filter(
    (a) => a.session === session.currentSession!.name,
  );
  return (
    <>
      <div
        className={cn(className, "flex flex-col justify-start overflow-hidden")}
      >
        <div className="no-scrollbar overflow-y-scroll">
          <AnimatePresence initial={false}>
            {attempts
              .map((row, index) => (
                <AttemptRow
                  key={row._id}
                  row={row}
                  index={index}
                  session={session}
                  maxDigits={Math.floor(Math.log10(attempts.length)) + 1}
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
