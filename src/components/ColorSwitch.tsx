import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { Moon, Sun } from "lucide-react";

const ColorSwitch = () => {
  const { setColorScheme } = useMantineColorScheme();

  // -> computedColorScheme is 'light' | 'dark', argument is the default value
  const computedColorScheme = useComputedColorScheme("light");

  return (
    <ActionIcon
      size="lg"
      variant="default"
      onClick={() => {
        setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
      }}
    >
      {computedColorScheme === "light" ? <Moon /> : <Sun />}
    </ActionIcon>
  );
};

export default ColorSwitch;
