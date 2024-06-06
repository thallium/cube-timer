import FormattedTime from "@/components/FormattedTime";
import { getStats } from "@/lib/stats";
import { cn } from "@/lib/utils";
import { useSession } from "@/session/useSession";

function Stats({
  className,
  textSize,
}: {
  className?: string;
  textSize?: string;
}) {
  const { attempts: allAttempts, currentSession } = useSession();
  const attempts = allAttempts.filter(
    (a) => a.session === currentSession!.name,
  );
  const { ao5, ao12, best } = getStats(attempts);
  return (
    <div
      className={cn(
        "whitespace-nowrap text-center text-2xl",
        className,
        textSize,
      )}
    >
      <div>{"#" + attempts.length}</div>
      <div>
        Best:{" "}
        <FormattedTime className="inline" textSize={textSize} time={best} />
      </div>
      <div>
        ø5: <FormattedTime className="inline" textSize={textSize} time={ao5} />
      </div>
      <div>
        ø12:{" "}
        <FormattedTime className="inline" textSize={textSize} time={ao12} />
      </div>
    </div>
  );
}

export default Stats;
