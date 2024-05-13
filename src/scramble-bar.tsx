function ScrambleBar({ scramble }: { scramble: string | undefined }) {
  return <div className="my-4 px-2 text-center text-3xl">{scramble}</div>;
}

export default ScrambleBar;
