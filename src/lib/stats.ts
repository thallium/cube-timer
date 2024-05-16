import { AttemptData } from "./attempt-data";

type TimeParts = {
  secFirst: string;
  secRest: string;
  decimals: string;
};

export function timeParts(time: number): TimeParts {
  // Each entry is [minimum number of digits if not first, separator before, value]
  const hours = Math.floor(time / (60 * 60 * 1000));
  const minutes = Math.floor(time / (60 * 1000)) % 60;
  const seconds = Math.floor(time / 1000) % 60;

  function pad(number: number, numDigitsAfterPadding: number) {
    let output = `${number}`;
    while (output.length < numDigitsAfterPadding) {
      output = `0${output}`;
    }
    return output;
  }

  const secFirstString = "";
  let secRestString;
  if (hours > 0) {
    secRestString = `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
  } else if (minutes > 0) {
    secRestString = `${minutes}:${pad(seconds, 2)}`;
  } else {
    secRestString = `${seconds}`;
    // if (secRestString[0] === "1") {
    //   secFirstString = "1";
    //   secRestString = secRestString.substr(1);
    // }
  }

  const centiseconds = Math.floor((time % 1000) / 10);

  return {
    secFirst: secFirstString,
    secRest: secRestString,
    decimals: `${pad(centiseconds, 2)}`,
  };
}

export function getStats(attempts: AttemptData[]) {
  const times = attempts.map((a) => a.totalResultMs);
  const sumArr = (sum: number, cur: number) => sum + cur;
  const ao5 =
    attempts.length >= 5
      ? times.slice(-5).toSorted().slice(1, -1).reduce(sumArr, 0) / 3
      : NaN;
  const ao12 =
    attempts.length >= 12
      ? times.slice(-12).toSorted().slice(1, -1).reduce(sumArr, 0) / 10
      : NaN;
  const best = Math.min(...times);
  return {
    ao5,
    ao12,
    best,
  };
}
