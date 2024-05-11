import { timeParts } from "./lib/stats";
import { cn } from "./lib/utils";
import { useSession } from "./lib/session";
import SessionSwitch from "./session-switch";

function Stats({ className }: { className: string }) {
  const { currentSession } = useSession();

  return (
    <div className={cn(className, "overflow-y-scroll max-h-lvh py-2")}>
      <SessionSwitch />
      {currentSession?.attempts.toReversed().map((row) => {
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
