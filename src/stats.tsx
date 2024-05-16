import { cn } from "@nextui-org/system";
import FormattedTime from "./components/FormattedTime";
import { getStats } from "./lib/stats";
import { SessionType } from "./lib/useSession";

function Stats({
  session,
  className,
}: {
  session: SessionType;
  className?: string;
}) {
  const { attempts } = session;
  const { ao5, ao12, best } = getStats(attempts);
  return (
    <div className={cn(className, "text-center text-2xl")}>
      <div>{"#" + attempts.length}</div>
      <div>
        best: <FormattedTime className="inline" time={best} />
      </div>
      <div>
        ø5: <FormattedTime className="inline" time={ao5} />
      </div>
      <div>
        ø12: <FormattedTime className="inline" time={ao12} />
      </div>
    </div>
  );
}

export default Stats;
