import { Alg } from "cubing/alg";
import "cubing/twisty";
import { TwistyPlayer } from "cubing/twisty";
import { useEffect, useRef } from "react";
function ScrambleDisplay({ scramble }: { scramble: Alg | undefined }) {
  const playerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const twistyPlayer = new TwistyPlayer({
      alg: scramble,
      controlPanel: "none",
      visualization: "2D",
      background: "none",
    });
    while (playerRef.current?.firstChild) {
      playerRef.current.removeChild(playerRef.current.firstChild);
    }
    playerRef.current?.appendChild(twistyPlayer);
  }, [scramble]);
  return (
    <div className="flex justify-center">
      <div ref={playerRef}></div>
    </div>
  );
}

export default ScrambleDisplay;
