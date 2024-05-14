import { Alg } from "cubing/alg";
import "cubing/twisty";
import { TwistyPlayer } from "cubing/twisty";
import { useEffect, useRef } from "react";
import { EventID } from "./lib/events";

const eventToPuzzle = {
  "222": "2x2x2",
  "333": "3x3x3",
  "444": "4x4x4",
  "555": "5x5x5",
  "666": "6x6x6",
  "777": "7x7x7",
} as const;

function ScrambleDisplay({
  scramble,
  event,
}: {
  scramble: Alg | undefined;
  event: EventID;
}) {
  const playerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const twistyPlayer = new TwistyPlayer({
      alg: scramble,
      controlPanel: "none",
      visualization: "2D",
      background: "none",
      puzzle: eventToPuzzle[event],
    });
    while (playerRef.current?.firstChild) {
      playerRef.current.removeChild(playerRef.current.firstChild);
    }
    playerRef.current?.appendChild(twistyPlayer);
  }, [scramble, event]);
  return (
    <div className="flex justify-center">
      <div ref={playerRef}></div>
    </div>
  );
}

export default ScrambleDisplay;
