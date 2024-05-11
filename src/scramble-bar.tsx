function ScrambleBar({ scramble }: { scramble: string | undefined }) {
  return <div className="text-3xl text-center my-4">{scramble}</div>;
}

export default ScrambleBar;
