import { SessionType } from "./lib/useSession";
import MobileLayout from "./mobile-layout";
import Stats from "./results";
import { ViewType } from "./types/view";

function MobileResults({
  session,
  setView,
}: {
  className?: string;
  session: SessionType;
  setView: (view: ViewType) => void;
}) {
  return (
    <MobileLayout setView={setView}>
      <Stats session={session} className="grow" />
    </MobileLayout>
  );
}

export default MobileResults;
