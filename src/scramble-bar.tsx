function ScrambleBar({ scramble }: { scramble: string | undefined }) {
  return (
    <div className="my-4 px-3 text-center font-mono text-xl sm:text-3xl">
      {scramble}
    </div>
  );
}

export default ScrambleBar;
