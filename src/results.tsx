import { Button } from "@nextui-org/button";
import { X } from "lucide-react";
import FormattedTime from "./components/FormattedTime";
import { SessionType } from "./lib/useSession";
import { cn } from "./lib/utils";

function Results({
  className,
  session,
}: {
  className?: string;
  session: SessionType;
}) {
  return (
    <div
      className={cn(className, "flex flex-col justify-start overflow-hidden")}
    >
      <div className="no-scrollbar overflow-y-scroll">
        <table className="table-auto">
          <tbody>
            {session.attempts
              .map((row, index) => {
                const { _id, totalResultMs } = row;
                return (
                  <tr key={_id} className="my-2 border-y">
                    <th className="w-1/12 text-2xl font-normal text-default-500">
                      {index + 1}
                    </th>
                    <th className="font-normal">
                      <FormattedTime time={totalResultMs} />
                    </th>
                    <th className="w-1/12">
                      <Button
                        isIconOnly
                        variant="light"
                        onClick={() => session.deleteAttempt(_id)}
                        className="text-default-400"
                      >
                        <X />
                      </Button>
                    </th>
                  </tr>
                );
              })
              .toReversed()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Results;
