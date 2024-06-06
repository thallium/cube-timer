import { Text } from "@mantine/core";

function ScrambleBar({ scramble }: { scramble: string | undefined }) {
  return (
    <Text className="my-4 px-3 text-center font-mono text-xl sm:text-3xl">
      {scramble || "Scrambling..."}
    </Text>
  );
}

export default ScrambleBar;
