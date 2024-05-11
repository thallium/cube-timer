import { useCallback, useRef, useState } from "react";

const useTimer = () => {
  const [time, setTime] = useState(0);
  const startTime = useRef<number>(0);

  const requestRef = useRef<number>(0);

  const start = useCallback(() => {
    if (startTime.current !== 0) return;
    startTime.current = Math.floor(performance.now());
    setTime(0);
    const animate = () => {
      const time = Math.floor(performance.now()) - startTime.current;
      setTime(time);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  const stop = useCallback(() => {
    if (startTime.current === 0) return 0;
    const time = Math.floor(performance.now()) - startTime.current;

    cancelAnimationFrame(requestRef.current);
    setTime(time);
    startTime.current = 0;
    return time;
  }, []);

  const reset = useCallback(() => {
    setTime(0);
    startTime.current = 0;
  }, []);

  return { time, start, stop, reset };
};

export default useTimer;
