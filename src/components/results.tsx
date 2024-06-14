import { useSession } from "@/session/useSession";
import { ScrollArea } from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import AttemptRow from "./AttemptRow";

function Results({ className }: { className?: string }) {
  const { attempts: allAttempts, currentSession } = useSession();
  const attempts = allAttempts.filter(
    (a) => a.session === currentSession!.name,
  );
  return (
    <ScrollArea className={className} type="scroll" scrollHideDelay={300}>
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
    </ScrollArea>
  );
}

export default Results;
