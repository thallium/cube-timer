import EventSwitch from "@/components/event-switch";
import Results from "@/components/results";
import ScrambleDisplay from "@/components/scramble-display";
import SessionSwitch from "@/components/session-switch";
import Stats from "@/components/stats";
import Timer from "@/components/timer";
import { Divider } from "@mantine/core";
import { Alg } from "cubing/alg";
import React from "react";
import ScrambleBar from "./components/scramble-bar";
import { SessionType } from "./lib/useSession";
import { State } from "./timing/useController";

const MemoedSessionSwitch = React.memo(SessionSwitch);
const MemoedStats = React.memo(Stats);
const MemoedResults = React.memo(Results);
const MemoedEventSwitch = React.memo(EventSwitch);
const MemoedScrambleBar = React.memo(ScrambleBar);
const MemoedTimer = React.memo(Timer);
const MemoedScrambleDisplay = React.memo(ScrambleDisplay);

function DeskTopView({
  session,
  scramble,
  state,
  time,
}: {
  session: SessionType;
  scramble: Alg | undefined;
  state: State;
  time: number;
}) {
  return (
    <div className="grid h-dvh select-none grid-cols-[1fr_3fr]">
      <div className="flex h-dvh flex-col border-r-1 px-2 py-4">
        <MemoedSessionSwitch session={session} />
        <Divider className="my-2" />
        <MemoedStats session={session} className="py-4" />
        <Divider className="my-2" />
        <MemoedResults session={session} />
      </div>
      <div className="flex h-dvh touch-none flex-col py-4">
        <div>
          <MemoedEventSwitch session={session} />
          <MemoedScrambleBar scramble={scramble?.toString()} />
        </div>
        <div className="flex grow flex-col justify-between">
          <MemoedTimer state={state} time={time} className=" grow" />
          <MemoedScrambleDisplay
            scramble={scramble}
            event={session.currentSession?.event ?? "333"}
            className=" grow-0"
          />
        </div>
      </div>
    </div>
  );
}

export default DeskTopView;
