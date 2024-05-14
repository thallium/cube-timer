import { Alg } from "cubing/alg";
import React from "react";
import EventSwitch from "./event-switch";
import { SessionType } from "./lib/useSession";
import MobileLayout from "./mobile-layout";
import ScrambleBar from "./scramble-bar";
import ScrambleDisplay from "./scramble-display";
import Timer from "./timer";
import { State } from "./timing/useController";

function MobileView({
  session,
  scramble,
  touchArea,
  state,
  time,
}: {
  session: SessionType;
  scramble: Alg | undefined;
  touchArea: React.RefObject<HTMLDivElement>;
  state: State;
  time: number;
}) {
  return (
    <MobileLayout>
      <div>
        <EventSwitch session={session} />
        <ScrambleBar scramble={scramble?.toString()} />
      </div>
      <div className="flex grow flex-col" ref={touchArea}>
        <Timer state={state} time={time} className=" grow" />
        <ScrambleDisplay
          scramble={scramble}
          event={session.currentSession?.event ?? "333"}
        />
      </div>
    </MobileLayout>
  );
}

export default MobileView;
