import { Alg } from "cubing/alg";
import React from "react";
import EventSwitch from "./event-switch";
import { SessionType } from "./lib/useSession";
import Stats from "./results";
import ScrambleBar from "./scramble-bar";
import ScrambleDisplay from "./scramble-display";
import Timer from "./timer";
import { State } from "./timing/useController";

function DeskTopView({
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
    <div className="grid h-dvh select-none grid-cols-[1fr_3fr]">
      <Stats session={session} className="bg-default-100 py-4" />
      <div className="flex h-dvh touch-none flex-col py-4">
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
      </div>
    </div>
  );
}

export default DeskTopView;
