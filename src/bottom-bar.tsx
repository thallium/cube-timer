import { List, Timer } from "lucide-react";
import { Link } from "react-router-dom";

function BottomBar() {
  return (
    <div className="pb-safe-or-4 flex flex-row justify-around bg-default-200 py-2">
      <Link to={"/"} className="text-xl">
        <Timer size={32} />
      </Link>
      <Link to={"/results"} className="text-xl">
        <List size={32} />
      </Link>
    </div>
  );
}

export default BottomBar;
