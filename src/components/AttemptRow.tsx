import FormattedTime from "@/components/FormattedTime";
import { AttemptData } from "@/lib/attempt-data";
import { SessionType } from "@/lib/useSession";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { X } from "lucide-react";

function AttemptRow({
  row,
  index,
  session,
}: {
  row: AttemptData;
  index: number;
  session: SessionType;
}) {
  const { _id, totalResultMs } = row;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div key={_id} className="flex flex-row items-center justify-between">
      <Button
        variant="light"
        className="w-20 px-3 py-2 text-center text-2xl text-default-500"
        onPress={onOpen}
      >
        {index + 1}
      </Button>
      <Button
        variant="light"
        className="justify-start px-3 py-2 text-left text-2xl"
        onPress={onOpen}
      >
        <FormattedTime time={totalResultMs} />
      </Button>
      <div className="grow"></div>
      <div className="px-3 py-2">
        <Button
          isIconOnly
          variant="light"
          onClick={() => session.deleteAttempt(_id)}
          className="text-default-400"
        >
          <X />
        </Button>
      </div>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="pb-8">
          <ModalHeader className="flex flex-col gap-1">
            Attempt #{index + 1}
          </ModalHeader>
          <ModalBody className="text-xl">
            <FormattedTime
              className="text-center text-3xl"
              time={totalResultMs}
            />
            <Accordion className="px-0">
              <AccordionItem
                key={1}
                aria-label="scramble"
                title="Scramble"
                classNames={{
                  base: "px-0",
                  trigger: "py-0",
                  title: "text-xl",
                  content: "font-mono",
                }}
                isCompact={true}
              >
                {/* <p className=" overflow-x-hidden text-ellipsis whitespace-nowrap"> */}
                {row.scramble}
                {/* </p> */}
              </AccordionItem>
            </Accordion>
            <p>Date: {new Date(row.unixDate).toLocaleString()}</p>
            <p>Event: {row.event}</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AttemptRow;
