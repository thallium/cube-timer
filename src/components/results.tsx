import { useSession } from "@/session/useSession";
import { ScrollArea } from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ViewportList } from "react-viewport-list";
import AttemptRow from "./AttemptRow";

function Results({ className }: { className?: string }) {
  const { attempts: allAttempts, currentSession } = useSession();
  const attempts = allAttempts.filter(
    (a) => a.session === currentSession!.name,
  );
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <ScrollArea
      className={className}
      ref={ref}
      type="scroll"
      scrollHideDelay={500}
    >
      <AnimatePresence initial={false}>
        <ViewportList viewportRef={ref} items={attempts.toReversed()}>
          {(row, index) => (
            <AttemptRow
              key={row._id}
              row={row}
              index={attempts.length - 1 - index}
              maxDigits={Math.floor(Math.log10(attempts.length)) + 1}
            />
          )}
        </ViewportList>
      </AnimatePresence>
    </ScrollArea>
  );
}

export default Results;
