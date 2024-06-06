import EventSwitch from "@/components/event-switch";
import ScrambleBar from "@/components/scramble-bar";
import ScrambleDisplay from "@/components/scramble-display";
import Stats from "@/components/stats";
import Timer from "@/components/timer";
import MobileLayout from "@/mobile/mobile-layout";
import { useSession } from "@/session/useSession";
import { ControllerType } from "@/timing/useController";
import { ViewType } from "@/types/view";
import { Alg } from "cubing/alg";
import { useEffect, useRef } from "react";

function MobileView({
  scramble,
  time,
  view,
  setView,
  controller,
}: {
  scramble: Alg | undefined;
  controller: ControllerType;
  time: number;
  view: string;
  setView: (view: ViewType) => void;
}) {
  const { state, up, down } = controller;
  const touchArea = useRef<HTMLDivElement>(null);
  const { currentSession } = useSession();

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
    <MobileLayout setView={setView} view={view} className="touch-none">
      <div>
        <EventSwitch />
        <ScrambleBar scramble={scramble?.toString()} />
      </div>
      <div className="flex grow flex-col px-2" ref={touchArea}>
        <Timer state={state} time={time} className="grow" />
        <div className="flex flex-row items-end justify-between">
          <Stats className="p-2" textSize="text-lg" />
          <ScrambleDisplay
            scramble={scramble}
            event={currentSession?.event ?? "333"}
          />
        </div>
      </div>
    </MobileLayout>
  );
}

export default MobileView;
