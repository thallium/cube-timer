import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/system";
import { List, Settings, Timer } from "lucide-react";
import { ViewType } from "./types/view";

function BottomBar({
  setView,
  view,
}: {
  setView: (view: ViewType) => void;
  view: string;
}) {
  return (
    <div className="flex flex-row justify-around border-t-1 py-2 pb-safe-or-4">
      <Button
        isIconOnly
        variant="light"
        onClick={() => setView("timer")}
        className={cn({ "text-primary": view === "timer" })}
      >
        <Timer size={32} />
      </Button>
      <Button
        isIconOnly
        variant="light"
        onClick={() => setView("results")}
        className={cn({ "text-primary": view === "results" })}
      >
        <List size={32} />
      </Button>
      <Button
        isIconOnly
        variant="light"
        onClick={() => setView("settings")}
        className={cn({ "text-primary": view === "settings" })}
      >
        <Settings size={32} />
      </Button>
    </div>
  );
}

export default BottomBar;
