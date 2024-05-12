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
import { useSession } from "./lib/useSession";
import { EventID } from "./lib/events";
import EventSwitch from "./event-switch";

async function genScramble(event: EventID) {
  return randomScrambleForEvent(event);
}

function App() {
  const { time, start, stop, reset } = useTimer();
  const [scramble, setScramble] = useState<Alg>();
  const {
    addAttempt,
    deleteAttempt,
    currentSession,
    sessions,
    changeSession,
    attempts,
    createSession,
    changeEvent,
  } = useSession();

  const solveDone = useCallback(
    (time: number) => {
      addAttempt(time);
    },
    [addAttempt]
  );

  const newAttempt = useCallback(() => {
    genScramble(currentSession?.event ?? "333").then((scramble) => {
      setScramble(scramble);
    });
  }, [currentSession]);

  const { state } = useController({
    startTimer: start,
    stopTimer: stop,
    resetTimer: reset,
    solveDoneCallback: solveDone,
    newAttemptCallback: newAttempt,
  });

  useEffect(() => {
    genScramble(currentSession?.event ?? "333").then((scramble) => {
      setScramble(scramble);
    });
  }, [currentSession]);

  return (
    <div className="grid grid-cols-[1fr_3fr]">
      <Stats
        attempts={attempts}
        currentSession={currentSession}
        sessions={sessions}
        changeSession={changeSession}
        createSession={createSession}
        deleteAttempt={deleteAttempt}
      />
      <div>
        <EventSwitch
          currentSession={currentSession}
          changeEvent={changeEvent}
        />
        <ScrambleBar scramble={scramble?.toString()} />
        <Timer state={state} time={time} />
        <ScrambleDisplay
          scramble={scramble}
          event={currentSession?.event ?? "333"}
        />
      </div>
    </div>
  );
}

export default App;
