import EventSwitch from "@/components/event-switch";
import Results from "@/components/results";
import ScrambleDisplay from "@/components/scramble-display";
import Stats from "@/components/stats";
import Timer from "@/components/timer";
import { Divider } from "@mantine/core";
import { Alg } from "cubing/alg";
import TopBar from "./components/TopBar";
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
    <>
      <TopBar />
      <div className="fixed bottom-0 top-[3.75rem] flex w-[16rem] flex-col border-r-1 px-2 py-4">
        {/* <SessionSwitch session={session} /> */}
        <Stats session={session} className="" />
        <Divider className="my-2" />
        <Results session={session} />
      </div>
      <div className="fixed inset-0 top-[3.75rem] flex touch-none flex-col py-4 pl-[16rem]">
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
      {/* </div> */}
    </>
  );
}

export default DeskTopView;
