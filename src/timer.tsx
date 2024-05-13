import { State } from "./timing/useController";
import { timeParts } from "./lib/stats";
import { cn } from "./lib/utils";

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
    <div className={cn(className, "flex justify-center items-center")}>
      <h1
        className={cn("text-9xl font-mono", {
          "text-red-600": state === State.HandOnTimer,
        })}
      >{`${secRest}.${decimals}`}</h1>
    </div>
  );
}

export default Timer;
