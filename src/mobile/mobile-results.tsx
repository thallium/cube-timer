import Results from "@/components/results";
import SessionSwitch from "@/components/session-switch";
import MobileLayout from "@/mobile/mobile-layout";
import { ViewType } from "@/types/view";

function MobileResults({
  setView,
  view,
}: {
  className?: string;
  view: string;
  setView: (view: ViewType) => void;
}) {
  return (
    <MobileLayout view={view} setView={setView} className=" touch-none">
      <SessionSwitch />
      <Results className="grow px-4" />
    </MobileLayout>
  );
}

export default MobileResults;
