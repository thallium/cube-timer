import { Button, useMantineColorScheme } from "@mantine/core";
import React from "react";

const ThemeButtons: React.FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  return (
    <Button.Group>
      <Button
        variant={colorScheme === "light" ? "filled" : "default"}
        onClick={() => {
          setColorScheme("light");
        }}
      >
        Light
      </Button>
      <Button
        variant={colorScheme === "dark" ? "filled" : "default"}
        onClick={() => {
          setColorScheme("dark");
        }}
      >
        Dark
      </Button>
      <Button
        variant={colorScheme === "auto" ? "filled" : "default"}
        onClick={() => {
          setColorScheme("auto");
        }}
      >
        Auto
      </Button>
    </Button.Group>
  );
};

export default ThemeButtons;
