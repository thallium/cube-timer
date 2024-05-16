import { Button } from "@nextui-org/button";
import { X } from "lucide-react";
import { timeParts } from "./lib/stats";
import { SessionType } from "./lib/useSession";
import { cn } from "./lib/utils";

function Results({
  className,
  session,
}: {
  className?: string;
  session: SessionType;
}) {
  return (
    <div className={cn(className, "overflow-y-scroll")}>
      {session.attempts.toReversed().map((row) => {
        const { _id, totalResultMs } = row;
        const { secRest, decimals } = timeParts(totalResultMs);
        return (
          <div
            key={_id}
            className="my-2 flex flex-row items-center justify-center"
          >
            <div className="text-center text-2xl">
              {`${secRest}.${decimals}`}
            </div>
            <Button
              isIconOnly
              variant="light"
              onClick={() => session.deleteAttempt(_id)}
              className=" text-default-400"
            >
              <X />
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default Results;
