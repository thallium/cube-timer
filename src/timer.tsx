import { timeParts } from "./lib/stats";
import { cn } from "./lib/utils";
import { State } from "./timing/useController";

function Timer({
  state,
  time,
  className,
}: {
  state: State;
  time: number;
  className?: string;
}) {
  const { secRest, decimals } = timeParts(time);
  return (
    <div className={cn(className, "flex items-center justify-center")}>
      <h1
        className={cn("font-mono text-7xl sm:text-9xl", {
          "text-red-600": state === State.HandOnTimer,
          "text-green-400": state === State.Ready,
        })}
      >{`${secRest}.${decimals}`}</h1>
    </div>
  );
}

export default Timer;
