import EventSwitch from "@/components/event-switch";
import Results from "@/components/results";
import ScrambleDisplay from "@/components/scramble-display";
import SessionSwitch from "@/components/session-switch";
import Stats from "@/components/stats";
import Timer from "@/components/timer";
import { Divider } from "@nextui-org/divider";
import { Alg } from "cubing/alg";
import ScrambleBar from "./components/scramble-bar";
import { SessionType } from "./lib/useSession";
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
      <div className="flex h-dvh flex-col border-r-1 px-2 py-4">
        <SessionSwitch session={session} />
        <Divider className="my-2" />
        <Stats session={session} className="py-4" />
        <Divider className="my-2" />
        <Results session={session} />
      </div>
      <div className="flex h-dvh touch-none flex-col py-4">
        <div>
          <EventSwitch session={session} />
          <ScrambleBar scramble={scramble?.toString()} />
        </div>
        <div className="flex grow flex-col justify-between">
          <Timer state={state} time={time} className=" grow" />
          <ScrambleDisplay
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
