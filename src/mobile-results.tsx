import { SessionType } from "./lib/useSession";
import MobileLayout from "./mobile-layout";
import Results from "./results";
import SessionSwitch from "./session-switch";
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
      <SessionSwitch session={session} />
      <Results session={session} className="grow" />
    </MobileLayout>
  );
}

export default MobileResults;
