import { cn } from "@/lib/utils";
import { Collapse as CollapsePrimitive } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

interface CollapseProps {
  title: string;
  className?: string;
  children: ReactNode[] | ReactNode;
}
const Collapse: React.FC<CollapseProps> = ({ title, children, className }) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={toggle}
      >
        <div className={className}>{title}</div>
        <ChevronLeft
          className={cn({ "-rotate-90": opened }, "transition-transform")}
        />
      </div>
      <CollapsePrimitive in={opened}>{children}</CollapsePrimitive>
    </>
  );
};

export default Collapse;
