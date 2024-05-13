import "./App.css";
import useTimer from "./timing/useTimer";
import useController from "./timing/useController";
import { useCallback, useEffect, useRef, useState } from "react";
import { randomScrambleForEvent } from "cubing/scramble";
import { Alg } from "cubing/alg";
import { useSession } from "./lib/useSession";
import { EventID } from "./lib/events";
import { useMedia } from "use-media";
import DeskTopView from "./desktop-view";
import MobileView from "./mobile-view";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MobileResults from "./mobile-results";

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
      addAttempt(time, scramble);
    },
    [addAttempt, scramble],
  );

  const newAttempt = useCallback(() => {
    genScramble(currentSession?.event ?? "333").then((scramble) => {
      setScramble(scramble);
    });
  }, [currentSession]);

  const touchArea = useRef<HTMLDivElement>(null);
  const { state } = useController({
    startTimer: start,
    stopTimer: stop,
    resetTimer: reset,
    solveDoneCallback: solveDone,
    newAttemptCallback: newAttempt,
    touchArea: touchArea.current!,
  });

  useEffect(() => {
    genScramble(currentSession?.event ?? "333").then((scramble) => {
      setScramble(scramble);
    });
  }, [currentSession]);

  const isWide = useMedia({ minWidth: "640px" });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isWide ? (
              <DeskTopView
                attempts={attempts}
                currentSession={currentSession}
                sessions={sessions}
                changeSession={changeSession}
                createSession={createSession}
                deleteAttempt={deleteAttempt}
                changeEvent={changeEvent}
                scramble={scramble}
                touchArea={touchArea}
                state={state}
                time={time}
              />
            ) : (
              <MobileView
                attempts={attempts}
                currentSession={currentSession}
                sessions={sessions}
                changeSession={changeSession}
                createSession={createSession}
                deleteAttempt={deleteAttempt}
                changeEvent={changeEvent}
                scramble={scramble}
                touchArea={touchArea}
                state={state}
                time={time}
              />
            )
          }
        />
        <Route
          path="/results"
          element={
            <MobileResults
              attempts={attempts}
              currentSession={currentSession}
              sessions={sessions}
              changeSession={changeSession}
              createSession={createSession}
              deleteAttempt={deleteAttempt}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
