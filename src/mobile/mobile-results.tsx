import Results from "@/components/results";
import SessionSwitch from "@/components/session-switch";
import { SessionType } from "@/lib/useSession";
import MobileLayout from "@/mobile/mobile-layout";
import { ViewType } from "@/types/view";

function MobileResults({
  session,
  setView,
  view,
}: {
  className?: string;
  session: SessionType;
  view: string;
  setView: (view: ViewType) => void;
}) {
  return (
    <MobileLayout view={view} setView={setView} className=" touch-none">
      <SessionSwitch session={session} />
      <Results session={session} className="grow px-4" />
    </MobileLayout>
  );
}

export default MobileResults;
