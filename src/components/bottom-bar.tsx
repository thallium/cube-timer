import { Button } from "@mantine/core";
import { List, Settings, Timer } from "lucide-react";
import { ViewType } from "../types/view";

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
        variant="transparent"
        onClick={() => setView("timer")}
        color={view === "timer" ? "" : "dark"}
      >
        <Timer size={32} />
      </Button>
      <Button
        variant="transparent"
        onClick={() => setView("results")}
        color={view === "results" ? "" : "dark"}
      >
        <List size={32} />
      </Button>
      <Button
        variant="transparent"
        onClick={() => setView("settings")}
        color={view === "settings" ? "" : "dark"}
      >
        <Settings size={32} />
      </Button>
    </div>
  );
}

export default BottomBar;
