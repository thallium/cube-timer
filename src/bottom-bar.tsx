import { Button } from "@nextui-org/button";
import { List, Settings, Timer } from "lucide-react";
import { ViewType } from "./types/view";

function BottomBar({ setView }: { setView: (view: ViewType) => void }) {
  return (
    <div className="flex flex-row justify-around bg-default-200 py-2 pb-safe-or-4">
      <Button isIconOnly variant="light" onClick={() => setView("timer")}>
        <Timer size={32} />
      </Button>
      <Button isIconOnly variant="light" onClick={() => setView("results")}>
        <List size={32} />
      </Button>
      <Button isIconOnly variant="light" onClick={() => setView("settings")}>
        <Settings size={32} />
      </Button>
    </div>
  );
}

export default BottomBar;
