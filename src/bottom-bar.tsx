import { List, Timer } from "lucide-react";
import { Link } from "react-router-dom";

function BottomBar() {
  return (
    <div className="flex flex-row justify-around bg-default-200 py-2">
      <Link to={"/"} className="text-xl">
        <Timer size={32} />
        {/* <Button radius="sm" variant="light"> */}
        {/* </Button> */}
      </Link>
      <Link to={"/results"} className="text-xl">
        {/* <Button radius="sm" variant="light"> */}
        <List size={32} />
        {/* </Button> */}
      </Link>
    </div>
  );
}

export default BottomBar;
