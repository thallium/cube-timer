import { useCallback, useEffect, useRef, useState } from "react";

export enum State {
  HandOnTimer,
  Running,
  Stopped,
  Done,
  Ready,
  Ignore,
}

const transition: readonly State[][] = [
  [State.Ignore, State.Done],
  [State.Stopped, State.Ignore],
  [State.Ignore, State.Done],
  [State.HandOnTimer, State.Done],
  [State.Ignore, State.Running],
  [State.Ignore, State.Ignore],
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
  const handOnTimerTime = useRef(0);
  const timer = useRef(0);

  const Ready = () => {
    setState((state) => {
      if (state === State.HandOnTimer) {
        return State.Ready;
      }
      return state;
    });
  };

  const transit = useCallback(
    (state: State, event: number) => {
      const nextState = transition[state][event];
      switch (nextState) {
        case State.Done:
          clearTimeout(timer.current);
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
          timer.current = setTimeout(Ready, 500);
          // handOnTimerTime.current = Math.floor(performance.now());
          resetTimer();
          break;
        case State.Ready:
          if (Math.floor(performance.now()) - handOnTimerTime.current < 500) {
            return State.HandOnTimer;
          }
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
        down();
        // setState((state) => transit(state, 0));
      }
    };
    const keyUp = (e: KeyboardEvent) => {
      if (isTimerKey(e)) {
        e.stopPropagation();
        up();
        // setState((state) => transit(state, 1));
      }
    };

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transit]);

  return { state, down, up };
};

export type ControllerType = ReturnType<typeof useController>;

export default useController;
