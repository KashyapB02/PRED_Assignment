export const BOTTOM_MENU_ITEMS = [
  { id: "market", route: "/market", icon: "/markets.svg", label: "Market" },
  { id: "trade", route: "/", icon: "/trade.svg", label: "Trade" },
  { id: "wallet", route: "/wallet", icon: "/wallet.svg", label: "Wallet" },
  { id: "more", route: "/more", icon: "/more.svg", label: "More" },
] as const;

export type BottomMenuItems = (typeof BOTTOM_MENU_ITEMS)[number];
