import { EventID } from "@/lib/events";
import { cn } from "@/lib/utils";
import { Alg } from "cubing/alg";
import "cubing/twisty";
import { TwistyPlayer } from "cubing/twisty";
import { useEffect, useRef } from "react";

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
  className,
}: {
  scramble: Alg | undefined;
  event: EventID;
  className?: string;
}) {
  const playerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const twistyPlayer = new TwistyPlayer({
      alg: scramble || "",
      controlPanel: "none",
      visualization: "2D",
      background: "none",
      puzzle: eventToPuzzle[event],
    });
    twistyPlayer.style.width = "100%";

    while (playerRef.current?.firstChild) {
      playerRef.current.removeChild(playerRef.current.firstChild);
    }
    playerRef.current?.appendChild(twistyPlayer);
  }, [scramble, event]);

  return (
    <div
      ref={playerRef}
      className={cn(className, "flex grow flex-col justify-end")}
    ></div>
  );
}

export default ScrambleDisplay;
