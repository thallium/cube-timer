import { SessionType } from "./lib/useSession";
import MobileLayout from "./mobile-layout";
import Stats from "./results";

function MobileResults({
  session,
}: {
  className?: string;
  session: SessionType;
}) {
  return (
    <MobileLayout>
      <Stats session={session} className="grow" />
    </MobileLayout>
  );
}

export default MobileResults;
