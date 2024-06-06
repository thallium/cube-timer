import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { SessionType } from "../lib/useSession";
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
      <div className={cn(className, "overflow-y-auto")}>
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
    </>
  );
}

export default Results;
