import { Button } from "@nextui-org/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
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
        <Table hideHeader aria-label="results">
          <TableHeader>
            <TableColumn>Number</TableColumn>
            <TableColumn>Time</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {session.attempts
              .map((row, index) => {
                const { _id, totalResultMs } = row;
                return (
                  <TableRow key={_id} className="border-y">
                    <TableCell className="w-1/12 text-2xl text-default-500">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <FormattedTime time={totalResultMs} />
                    </TableCell>
                    <TableCell className="w-1/12">
                      <Button
                        isIconOnly
                        variant="light"
                        onClick={() => session.deleteAttempt(_id)}
                        className="text-default-400"
                      >
                        <X />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
              .toReversed()}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Results;
