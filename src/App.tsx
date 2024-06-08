import DeskTopView from "@/desktop-view";
import { EventID } from "@/lib/events";
import useController from "@/timing/useController";
import useTimer from "@/timing/useTimer";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Alg } from "cubing/alg";
import { randomScrambleForEvent } from "cubing/scramble";
import { useEffect, useState } from "react";
import { useMedia } from "use-media";
import "./App.css";
import MobileApp from "./mobile/MobileApp";
import { useSession } from "./session/useSession";

async function genScramble(event: EventID) {
  return randomScrambleForEvent(event);
}

function App() {
  const isWide = useMedia({ minWidth: "640px" });

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
  }, [currentSession?.event]);

  return isWide ? (
    <DeskTopView scramble={scramble} state={controller.state} time={time} />
  ) : (
    <MobileApp scramble={scramble} controller={controller} time={time} />
  );
}

export default App;
