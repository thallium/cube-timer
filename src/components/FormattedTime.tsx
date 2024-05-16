import { timeParts } from "../lib/stats";
import { cn } from "../lib/utils";

function FormattedTime({
  time,
  className,
}: {
  time: number;
  className?: string;
}) {
  const { secRest, decimals } = timeParts(time);
  return (
    <div className={cn(className, "text-2xl")}>
      {isFinite(time) ? `${secRest}.${decimals}` : "—"}
    </div>
  );
}

export default FormattedTime;
