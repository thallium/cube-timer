import Results from "@/components/results";
import ScrambleDisplay from "@/components/scramble-display";
import Stats from "@/components/stats";
import Timer from "@/components/timer";
import { Divider } from "@mantine/core";
import { Alg } from "cubing/alg";
import TopBar from "./components/TopBar";
import ScrambleBar from "./components/scramble-bar";
import { useSession } from "./session/useSession";
import { State } from "./timing/useController";

function DeskTopView({
  scramble,
  state,
  time,
}: {
  scramble: Alg | undefined;
  state: State;
  time: number;
}) {
  const { currentSession } = useSession();
  return (
    <>
      <TopBar />
      <div className="border-mantine fixed bottom-0 top-[3.75rem] z-20 flex w-[16rem] flex-col border-r px-2 py-4">
        <Stats className="" />
        <Divider className="my-2" />
        <Results />
      </div>
      <div className="fixed inset-0 top-[3.75rem] z-10 flex touch-none flex-col py-4 pl-[16rem]">
        <div>
          <ScrambleBar scramble={scramble?.toString()} />
        </div>
        <div className="flex grow flex-col justify-between">
          <Timer state={state} time={time} className=" grow" />
          <ScrambleDisplay
            scramble={scramble}
            event={currentSession?.event ?? "333"}
            className="grow-0"
          />
        </div>
      </div>
    </>
  );
}

export default DeskTopView;
