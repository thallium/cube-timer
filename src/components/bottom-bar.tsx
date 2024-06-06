import { ActionIcon } from "@mantine/core";
import { List, Settings, Timer } from "lucide-react";
import { ViewType, viewTypeList } from "../types/view";

interface IconProps {
  view: ViewType;
  size: number;
}
const IconOf: React.FC<IconProps> = ({ view, size }) => {
  console.log(view);
  switch (view) {
    case "timer":
      return <Timer size={size} />;
    case "results":
      return <List size={size} />;
    case "settings":
      return <Settings size={size} />;
  }
};

function BottomBar({
  setView,
  view,
}: {
  setView: (view: ViewType) => void;
  view: string;
}) {
  console.log(viewTypeList);
  return (
    <div className="border-t-1 fixed inset-x-0 bottom-0 flex h-16 flex-row items-center justify-around mb-safe">
      {viewTypeList.map((viewType) => (
        <ActionIcon
          key={viewType}
          variant="transparent"
          size="xl"
          onClick={() => setView(viewType)}
          color={view === viewType ? "" : "dark"}
        >
          <IconOf view={viewType} size={32} />
        </ActionIcon>
      ))}
    </div>
  );
}

export default BottomBar;
