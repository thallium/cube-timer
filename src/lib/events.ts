export const eventList = ["333", "222", "444", "555", "666", "777"] as const;

export type EventID = (typeof eventList)[number];
