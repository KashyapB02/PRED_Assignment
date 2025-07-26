import { createContext } from "react";

export type Trade = {
  id: string;
  type: "long" | "short";
  category: "limit" | "market";
  shares: number;
  usdPrice: number;
  createdAt: string;
};

export type TradeInfo = {
  action: "open" | "close";
};

export type TradeHistory = Trade & TradeInfo;

export type TradingProviderStates = {
  addOpenOrder: (openOrder: Trade) => void;
  addPosition: (position: Trade) => void;
  closeOpenOrder: (openOrder: Trade) => void;
  closePosition: (position: Trade) => void;
  openOrders: Array<Trade>;
  positions: Array<Trade>;
  tradeHistory: Array<TradeHistory>;
};

export const initialStates = {
  addOpenOrder: () => [],
  addPosition: () => [],
  closeOpenOrder: () => [],
  closePosition: () => [],
  openOrders: [],
  positions: [],
  tradeHistory: [],
} as const satisfies TradingProviderStates;

export const TradingContext = createContext<TradingProviderStates>(initialStates);
