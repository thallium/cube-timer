import { Alg } from "cubing/alg";
import { useEffect, useRef } from "react";
import EventSwitch from "./event-switch";
import { SessionType } from "./lib/useSession";
import MobileLayout from "./mobile-layout";
import ScrambleBar from "./scramble-bar";
import ScrambleDisplay from "./scramble-display";
import Stats from "./stats";
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
      <div className="flex grow flex-col px-2" ref={touchArea}>
        <Timer state={state} time={time} className="grow" />
        <div className="flex flex-row items-end justify-between">
          <Stats session={session} className="p-2" />
          <ScrambleDisplay
            scramble={scramble}
            event={session.currentSession?.event ?? "333"}
            width="19rem"
            // height="18rem"
          />
        </div>
      </div>
    </MobileLayout>
  );
}

export default MobileView;
