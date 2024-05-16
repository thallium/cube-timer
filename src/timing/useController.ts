import { useCallback, useEffect, useState } from "react";

export enum State {
  HandOnTimer,
  Running,
  Stopped,
  Done,
  Ignore,
}

const transition: readonly State[][] = [
  [State.Ignore, State.Running],
  [State.Stopped, State.Running],
  [State.Ignore, State.Done],
  [State.HandOnTimer, State.Done],
];

function isTimerKey(e: KeyboardEvent): boolean {
  return e.key === " ";
}

const useController = ({
  startTimer,
  stopTimer,
  resetTimer,
  solveDoneCallback,
  newAttemptCallback,
}: {
  startTimer: () => void;
  stopTimer: () => number;
  resetTimer: () => void;
  solveDoneCallback: (time: number) => void;
  newAttemptCallback: () => void;
}) => {
  const [state, setState] = useState(State.Done);

  const transit = useCallback(
    (state: State, event: number) => {
      const nextState = transition[state][event];
      switch (nextState) {
        case State.Done:
          break;
        case State.Running:
          startTimer();
          break;
        case State.Stopped: {
          const time = stopTimer();
          solveDoneCallback(time);
          newAttemptCallback();
          break;
        }
        case State.HandOnTimer:
          resetTimer();
          break;
        case State.Ignore:
          return state;
      }
      return nextState;
    },
    [startTimer, stopTimer, resetTimer, solveDoneCallback, newAttemptCallback],
  );

  const down = () => {
    setState((state) => transit(state, 0));
  };

  const up = () => {
    setState((state) => transit(state, 1));
  };

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (isTimerKey(e)) {
        e.stopPropagation();
        setState((state) => transit(state, 0));
      }
    };
    const keyUp = (e: KeyboardEvent) => {
      if (isTimerKey(e)) {
        e.stopPropagation();
        setState((state) => transit(state, 1));
      }
    };

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, [transit]);

  return { state, down, up };
};

export type ControllerType = ReturnType<typeof useController>;

export default useController;
