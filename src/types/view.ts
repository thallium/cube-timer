export const viewTypeList = ["timer", "results", "settings"] as const;

export type ViewType = (typeof viewTypeList)[number];
