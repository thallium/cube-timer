import React from "react";
import { AttemptData } from "./lib/attempt-data";
import { Session } from "./lib/useSession";
// import Stats from "./results";
import EventSwitch from "./event-switch";
import Timer from "./timer";
import ScrambleBar from "./scramble-bar";
import ScrambleDisplay from "./scramble-display";
import { EventID } from "./lib/events";
import { Alg } from "cubing/alg";
import { State } from "./timing/useController";
import MobileLayout from "./mobile-layout";

function MobileView({
  //   attempts,
  currentSession,
  //   sessions,
  //   changeSession,
  //   createSession,
  //   deleteAttempt,
  changeEvent,
  scramble,
  touchArea,
  state,
  time,
}: {
  className?: string;
  attempts: AttemptData[];
  currentSession: Session | undefined;
  sessions: Session[];
  changeSession: (name: string) => void;
  createSession: (name: string) => void;
  deleteAttempt: (id: string) => void;
  changeEvent: (name: EventID) => void;
  scramble: Alg | undefined;
  touchArea: React.RefObject<HTMLDivElement>;
  state: State;
  time: number;
}) {
  return (
    <MobileLayout>
      <div>
        <EventSwitch
          currentSession={currentSession}
          changeEvent={changeEvent}
        />
        <ScrambleBar scramble={scramble?.toString()} />
      </div>
      <div className="flex grow flex-col" ref={touchArea}>
        <Timer state={state} time={time} className=" grow" />
        <ScrambleDisplay
          scramble={scramble}
          event={currentSession?.event ?? "333"}
        />
      </div>
    </MobileLayout>
  );
}

export default MobileView;
