export type DropdownOptions = {
  value: string;
  label: string;
};

export const LIMIT_DROPDOWN_OPTIONS = [
  { value: "", label: "Limit" },
  { value: "5", label: "5 Items" },
  { value: "10", label: "10 Items" },
  { value: "15", label: "15 Items" },
  { value: "20", label: "20 Items" },
  { value: "30", label: "30 Items" },
] as const satisfies Array<DropdownOptions>;
