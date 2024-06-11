import FormattedTime from "@/components/FormattedTime";
import { AttemptData } from "@/lib/attempt-data";
import { useSession } from "@/session/useSession";
import { ActionIcon, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Collapse from "./ui/collapse";

const t = (d: number) => d * 4;

interface AttemptRowProps {
  row: AttemptData;
  index: number;
  maxDigits: number;
}

const AttemptRow: React.FC<AttemptRowProps> = ({ row, index, maxDigits }) => {
  const { deleteAttempt } = useSession();
  const { _id, totalResultMs } = row;
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <motion.div
      //   layout
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: "auto",
        opacity: 1,
        transition: {
          bounce: 0.3,
          opacity: { delay: t(0.025) },
        },
      }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        duration: t(0.1),
        bounce: 0.2,
        opacity: { duration: t(0.03) },
      }}
      key={_id}
    >
      <div className="border-b-1 flex flex-row items-center justify-between py-2">
        <Button
          variant="subtle"
          color="gray.6"
          className={`text-center font-mono text-2xl font-normal`}
          onClick={open}
          w={2.25 + maxDigits + "rem"}
        >
          {index + 1}
        </Button>
        <Button
          variant="subtle"
          color="text"
          className="grow text-2xl font-normal"
          classNames={{
            inner: "justify-start",
          }}
          onClick={open}
        >
          <FormattedTime time={totalResultMs} />
        </Button>
        <ActionIcon
          variant="subtle"
          color="gray.6"
          size="lg"
          onClick={() => deleteAttempt(_id)}
        >
          <X size={24} />
        </ActionIcon>
      </div>
      <Modal
        centered
        opened={opened}
        onClose={close}
        padding="lg"
        title={`Attempt #${index + 1}`}
      >
        <div className="flex flex-col gap-3 py-2 text-xl">
          <FormattedTime
            className="text-center text-3xl"
            time={totalResultMs}
          />
          <Collapse title="Scramble">
            <div className="font-mono">{row.scramble || "No Scramble"}</div>
          </Collapse>
          <p>Date: {new Date(row.unixDate).toLocaleString()}</p>
          <p>Event: {row.event}</p>
        </div>
      </Modal>
    </motion.div>
  );
};

export default AttemptRow;
