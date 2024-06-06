import Settings from "@/components/settings";
import DeskTopView from "@/desktop-view";
import { EventID } from "@/lib/events";
import MobileLayout from "@/mobile/mobile-layout";
import MobileResults from "@/mobile/mobile-results";
import MobileView from "@/mobile/mobile-view";
import useController from "@/timing/useController";
import useTimer from "@/timing/useTimer";
import { ViewType } from "@/types/view";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Alg } from "cubing/alg";
import { randomScrambleForEvent } from "cubing/scramble";
import { useEffect, useState } from "react";
import { useMedia } from "use-media";
import "./App.css";
import { useSession } from "./session/useSession";

async function genScramble(event: EventID) {
  return randomScrambleForEvent(event);
}

function App() {
  const isWide = useMedia({ minWidth: "640px" });
  const [view, setView] = useState<ViewType>("timer");

  const { time, start, stop, reset } = useTimer();
  const [scramble, setScramble] = useState<Alg>();
  const { addAttempt, currentSession } = useSession();

  const solveDone = (time: number) => {
    addAttempt(time, scramble);
  };

  const newAttempt = () => {
    genScramble(currentSession?.event ?? "333").then((scramble) => {
      setScramble(scramble);
    });
  };

  const controller = useController({
    startTimer: start,
    stopTimer: stop,
    resetTimer: reset,
    solveDoneCallback: solveDone,
    newAttemptCallback: newAttempt,
  });

  useEffect(() => {
    setScramble(undefined);
    genScramble(currentSession?.event ?? "333").then((scramble) => {
      setScramble(scramble);
    });
  }, [currentSession]);

  if (view === "timer") {
    return isWide ? (
      <DeskTopView scramble={scramble} state={controller.state} time={time} />
    ) : (
      <MobileView
        view={view}
        scramble={scramble}
        controller={controller}
        time={time}
        setView={setView}
      />
    );
  } else if (view === "results") {
    return <MobileResults view={view} setView={setView} />;
  } else if (view === "settings") {
    return (
      <MobileLayout setView={setView} view={view}>
        <Settings />
      </MobileLayout>
    );
  } else {
    return <></>;
  }
}

export default App;
