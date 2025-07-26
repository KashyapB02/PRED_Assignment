import { TradingContext } from "@/context/trading";
import { useContext } from "react";

export function useTradingStates() {
  const context = useContext(TradingContext);

  if (!context) {
    throw new Error("useTradingStates must be used withing a TradingProvider.");
  }

  return context;
}
