import { cn } from "@/lib/utils";
import { useSession } from "@/session/useSession";
import { AnimatePresence } from "framer-motion";
import AttemptRow from "./AttemptRow";

function Results({ className }: { className?: string }) {
  const { attempts: allAttempts, currentSession } = useSession();
  const attempts = allAttempts.filter(
    (a) => a.session === currentSession!.name,
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
