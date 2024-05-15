function ScrambleBar({ scramble }: { scramble: string | undefined }) {
  return (
    <div className="my-4 px-3 text-center text-xl sm:text-2xl">{scramble}</div>
  );
}

export default ScrambleBar;
