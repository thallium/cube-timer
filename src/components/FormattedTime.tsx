import { cn } from "@nextui-org/system";
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
    <div className={cn(className, textSize, "text-2xl")}>
      {isFinite(time) ? `${secRest}.${decimals}` : "—"}
    </div>
  );
}

export default FormattedTime;
