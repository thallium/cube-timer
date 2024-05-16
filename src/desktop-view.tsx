import { Alg } from "cubing/alg";
import EventSwitch from "./event-switch";
import { SessionType } from "./lib/useSession";
import Results from "./results";
import ScrambleBar from "./scramble-bar";
import ScrambleDisplay from "./scramble-display";
import SessionSwitch from "./session-switch";
import Timer from "./timer";
import { State } from "./timing/useController";

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
      <div className="flex h-dvh flex-col bg-default-100 py-4">
        <SessionSwitch session={session} />
        <Results session={session} />
      </div>
      <div className="flex h-dvh touch-none flex-col py-4">
        <div>
          <EventSwitch session={session} />
          <ScrambleBar scramble={scramble?.toString()} />
        </div>
        <div className="flex grow flex-col">
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
