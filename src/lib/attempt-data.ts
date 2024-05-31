import { EventID } from "./events";

type AlgString = string;

// An *attempt* starts when the competitor starts inspection and ends when they confirm the result.
// A *solve* is the portion of an attempt when the timer is running.
export interface AttemptData {
  _id: string;
  session: string;
  // Total result *including* penalties, rounded to the nearest millisecond.
  // TODO: FMC, multi blind, BLD memo info
  totalResultMs: number;

  // Unix date of the solve, in milliseconds.
  // Ideally, this date represents the end of the solve (the moment when the timer stopped).
  // TODO: Add a revision date?
  unixDate: number;
  event?: EventID;
  scramble?: AlgString;

  // Arbitrary user-provided comment.
  comment?: string; // TODO
  solution?: AlgString; // TODO
  // penalties?: Penalty[]; // TODO

  // TODO: change this to general tags?
  device?: string;
}
