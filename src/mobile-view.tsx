import { Alg } from "cubing/alg";
import { useEffect, useRef } from "react";
import EventSwitch from "./event-switch";
import { SessionType } from "./lib/useSession";
import MobileLayout from "./mobile-layout";
import ScrambleBar from "./scramble-bar";
import ScrambleDisplay from "./scramble-display";
import Timer from "./timer";
import { ControllerType } from "./timing/useController";
import { ViewType } from "./types/view";

function MobileView({
  session,
  scramble,
  time,
  setView,
  controller,
}: {
  session: SessionType;
  scramble: Alg | undefined;
  controller: ControllerType;
  time: number;
  setView: (view: ViewType) => void;
}) {
  const { state, up, down } = controller;
  const touchArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const touchAreaTmp = touchArea.current;
    touchAreaTmp?.addEventListener("touchstart", down);
    touchAreaTmp?.addEventListener("touchend", up);

    return () => {
      touchAreaTmp?.removeEventListener("touchstart", down);
      touchAreaTmp?.removeEventListener("touchend", up);
    };
  }, [touchArea.current]);

  return (
    <MobileLayout setView={setView} className="touch-none">
      <div>
        <EventSwitch session={session} />
        <ScrambleBar scramble={scramble?.toString()} />
      </div>
      <div className="flex grow flex-col" ref={touchArea}>
        <Timer state={state} time={time} className="grow" />
        <ScrambleDisplay
          scramble={scramble}
          event={session.currentSession?.event ?? "333"}
        />
      </div>
    </MobileLayout>
  );
}

export default MobileView;
