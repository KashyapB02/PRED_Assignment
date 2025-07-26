export type DropdownOptions = {
  value: string;
  label: string;
};

export const LIMIT_DROPDOWN_OPTIONS = [
  { value: "limit", label: "Limit" },
  { value: "market", label: "Market" },
] as const satisfies Array<DropdownOptions>;
