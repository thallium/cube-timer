import "./App.css";
import useTimer from "./timing/useTimer";
import useController from "./timing/useController";
import Stats from "./stats";
import ScrambleBar from "./scramble-bar";
import { useCallback, useEffect, useState } from "react";
import { randomScrambleForEvent } from "cubing/scramble";
import Timer from "./timer";
import ScrambleDisplay from "./scramble-display";
import { Alg } from "cubing/alg";
import { useSession } from "./lib/session";

async function genScramble() {
  return randomScrambleForEvent("777");
}

function App() {
  const { time, start, stop, reset } = useTimer();
  const [scramble, setScramble] = useState<Alg>();
  const { addAttempt } = useSession();

  const solveDone = useCallback(
    (time: number) => {
      addAttempt(time);
    },
    [addAttempt]
  );

  const newAttempt = useCallback(() => {
    genScramble().then((scramble) => {
      setScramble(scramble);
    });
  }, []);

  const { state } = useController({
    startTimer: start,
    stopTimer: stop,
    resetTimer: reset,
    solveDoneCallback: solveDone,
    newAttemptCallback: newAttempt,
  });

  useEffect(() => {
    genScramble().then((scramble) => {
      setScramble(scramble);
    });
  }, []);

  return (
    <div className="grid grid-cols-[1fr_3fr] grid-rows-3">
      <Stats className="row-span-3" />
      <ScrambleBar scramble={scramble?.toString()} />
      <Timer state={state} time={time} />
      <ScrambleDisplay scramble={scramble} />
    </div>
  );
}

export default App;
