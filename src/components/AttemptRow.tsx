import FormattedTime from "@/components/FormattedTime";
import { AttemptData } from "@/lib/attempt-data";
import { useSession } from "@/session/useSession";
import { ActionIcon, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const t = (d: number) => d * 4;

interface AttemptRowProps {
  row: AttemptData;
  index: number;
  maxDigits: number;
}

const AttemptRow: React.FC<AttemptRowProps> = ({ row, index, maxDigits }) => {
  const { deleteAttempt } = useSession();
  const { _id, totalResultMs } = row;

  const open = () => {
    modals.openContextModal({
      modal: "singleAttempt",
      title: `Attempt #${index + 1}`,
      innerProps: { attempt: row },
      padding: "lg",
      centered: true,
    });
  };

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
    </motion.div>
  );
};

export default AttemptRow;
