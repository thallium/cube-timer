import Settings from "@/components/settings";
import DeskTopView from "@/desktop-view";
import { EventID } from "@/lib/events";
import { useSession } from "@/lib/useSession";
import MobileLayout from "@/mobile/mobile-layout";
import MobileResults from "@/mobile/mobile-results";
import MobileView from "@/mobile/mobile-view";
import useController from "@/timing/useController";
import useTimer from "@/timing/useTimer";
import { ViewType } from "@/types/view";
import "@mantine/core/styles.css";
import { Alg } from "cubing/alg";
import { randomScrambleForEvent } from "cubing/scramble";
import { useCallback, useEffect, useState } from "react";
import { useMedia } from "use-media";
import "./App.css";

async function genScramble(event: EventID) {
  return randomScrambleForEvent(event);
}

function App() {
  const isWide = useMedia({ minWidth: "640px" });
  const [view, setView] = useState<ViewType>("timer");

  const { time, start, stop, reset } = useTimer();
  const [scramble, setScramble] = useState<Alg>();
  const session = useSession();

  const solveDone = useCallback(
    (time: number) => {
      session.addAttempt(time, scramble);
    },
    [session.addAttempt, scramble],
  );

  const newAttempt = useCallback(() => {
    genScramble(session.currentSession?.event ?? "333").then((scramble) => {
      setScramble(scramble);
    });
  }, [session.currentSession]);

  const controller = useController({
    startTimer: start,
    stopTimer: stop,
    resetTimer: reset,
    solveDoneCallback: solveDone,
    newAttemptCallback: newAttempt,
  });

  useEffect(() => {
    setScramble(undefined);
    genScramble(session.currentSession?.event ?? "333").then((scramble) => {
      setScramble(scramble);
    });
  }, [session.currentSession]);

  if (view === "timer") {
    return isWide ? (
      <DeskTopView
        session={session}
        scramble={scramble}
        state={controller.state}
        time={time}
      />
    ) : (
      <MobileView
        view={view}
        session={session}
        scramble={scramble}
        controller={controller}
        time={time}
        setView={setView}
      />
    );
  } else if (view === "results") {
    return <MobileResults view={view} setView={setView} session={session} />;
  } else if (view === "settings") {
    return (
      <MobileLayout setView={setView} view={view}>
        <Settings session={session} />
      </MobileLayout>
    );
  } else {
    return <></>;
  }
}

export default App;
