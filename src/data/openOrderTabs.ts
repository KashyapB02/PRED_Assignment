export const OPEN_ORDER_TABS = [
  { label: "Open Orders", value: "open_orders" },
  { label: "Positions", value: "positions" },
  { label: "Trade History", value: "trade_history" },
] as const;

export type OpenOrderTab = (typeof OPEN_ORDER_TABS)[number];
