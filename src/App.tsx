/* eslint-disable react-hooks/exhaustive-deps */
import { Alg } from "cubing/alg";
import { randomScrambleForEvent } from "cubing/scramble";
import { useCallback, useEffect, useState } from "react";
import { useMedia } from "use-media";
import "./App.css";
import DeskTopView from "./desktop-view";
import { EventID } from "./lib/events";
import { useSession } from "./lib/useSession";
import MobileResults from "./mobile-results";
import MobileView from "./mobile-view";
import useController from "./timing/useController";
import useTimer from "./timing/useTimer";
import { ViewType } from "./types/view";

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
        session={session}
        scramble={scramble}
        controller={controller}
        time={time}
        setView={setView}
      />
    );
  } else if (view === "results") {
    return <MobileResults setView={setView} session={session} />;
  } else {
    return <></>;
  }
}

export default App;
