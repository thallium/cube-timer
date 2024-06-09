import EventSwitch from "@/components/event-switch";
import Results from "@/components/results";
import ScrambleBar from "@/components/scramble-bar";
import ScrambleDisplay from "@/components/scramble-display";
import SessionSwitch from "@/components/session-switch";
import MobileSettings from "@/components/settings/settings";
import Stats from "@/components/stats";
import Timer from "@/components/timer";
import { useSession } from "@/session/useSession";
import { ControllerType } from "@/timing/useController";
import { Alg } from "cubing/alg";
import React, { useEffect, useRef, useState } from "react";
import BottomBar from "../components/bottom-bar";
import { ViewType } from "../types/view";

const MobileTimer: React.FC<MobileAppProps> = ({
  controller,
  scramble,
  time,
}) => {
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
  }, [down, up]);

  return (
    <>
      <div>
        <EventSwitch />
        <ScrambleBar scramble={scramble?.toString()} />
      </div>
      <div className="flex grow flex-col" ref={touchArea}>
        <Timer state={state} time={time} className="grow" />
        <div className="flex flex-row items-end justify-between">
          <Stats className="p-2" textSize="text-lg" />
          <ScrambleDisplay
            scramble={scramble}
            event={currentSession?.event ?? "333"}
          />
        </div>
      </div>
    </>
  );
};

const MobileResults: React.FC = () => {
  return (
    <>
      <div className="mx-auto mb-2">
        <SessionSwitch />
      </div>
      <Results className="grow" />
    </>
  );
};

interface MobileAppProps {
  scramble: Alg | undefined;
  controller: ControllerType;
  time: number;
}

const MobileApp: React.FC<MobileAppProps> = ({
  scramble,
  controller,
  time,
}) => {
  const [view, setView] = useState<ViewType>("timer");
  let children: React.ReactNode;
  switch (view) {
    case "timer":
      children = (
        <MobileTimer controller={controller} scramble={scramble} time={time} />
      );
      break;
    case "results":
      children = <MobileResults />;
      break;
    case "settings":
      children = <MobileSettings />;
      break;
  }
  return (
    <>
      <div className="fixed inset-0 flex select-none flex-col px-4 pt-4 mb-safe-offset-16">
        {children}
      </div>
      <BottomBar setView={setView} view={view} />
    </>
  );
};

export default MobileApp;
