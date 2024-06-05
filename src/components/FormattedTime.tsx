import { cn } from "@/lib/utils";
import { timeParts } from "../lib/stats";

function FormattedTime({
  time,
  className,
  textSize,
}: {
  time: number;
  className?: string;
  textSize?: string;
}) {
  const { secRest, decimals } = timeParts(time);
  return (
    <div className={cn("text-2xl", className, textSize)}>
      {isFinite(time) ? `${secRest}.${decimals}` : "—"}
    </div>
  );
}

export default FormattedTime;
