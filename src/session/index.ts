import { EventID } from "@/lib/events";

export type Session = {
  name: string; // id is the name of the group
  event: EventID;
  createdAt?: number;
};
