import { useCallback, useMemo, type ReactNode } from "react";
import {
  initialStates,
  type Trade,
  type TradeInfo,
  TradingContext,
  type TradingProviderStates,
} from "./tradingContext";
import { usePersistedState } from "@/hooks";

type TradingProviderProps = {
  children: ReactNode;
};

export function TradingProvider({ children }: Readonly<TradingProviderProps>) {
  const [openOrders, setOpenOrders] = usePersistedState<TradingProviderStates["openOrders"]>({
    key: "@pred_assignment/open_orders",
    initialValue: initialStates.openOrders,
  });
  const [positions, setPositions] = usePersistedState<TradingProviderStates["positions"]>({
    key: "@pred_assignment/positions",
    initialValue: initialStates.positions,
  });
  const [tradeHistory, setTradeHistory] = usePersistedState<TradingProviderStates["tradeHistory"]>({
    key: "@pred_assignment/trade_history",
    initialValue: initialStates.tradeHistory,
  });

  const pushToHistory = useCallback(
    (trade: Trade, options: TradeInfo) => {
      const newTrade = { ...trade, ...options };
      setTradeHistory((current) => [newTrade, ...current]);
    },
    [setTradeHistory]
  );

  const addOpenOrder = useCallback(
    (openOrder: Trade) => {
      setOpenOrders((current) => {
        const updated = [openOrder, ...current];
        pushToHistory(openOrder, { action: "open" });
        return updated;
      });
    },
    [pushToHistory, setOpenOrders]
  );

  const addPosition = useCallback(
    (position: Trade) => {
      setPositions((current) => {
        const updated = [position, ...current];
        pushToHistory(position, { action: "open" });
        return updated;
      });
    },
    [pushToHistory, setPositions]
  );

  const closeOpenOrder = useCallback(
    (openOrder: Trade) => {
      setOpenOrders((current) => {
        const updated = current.filter((order) => order.id !== openOrder.id);
        pushToHistory(openOrder, { action: "close" });
        return updated;
      });
    },
    [pushToHistory, setOpenOrders]
  );

  const closePosition = useCallback(
    (position: Trade) => {
      setPositions((current) => {
        const updated = current.filter((order) => order.id !== position.id);
        pushToHistory(position, { action: "close" });
        return updated;
      });
    },
    [pushToHistory, setPositions]
  );

  const providerStates = useMemo(
    () => ({
      addOpenOrder,
      addPosition,
      closeOpenOrder,
      closePosition,
      openOrders,
      positions,
      tradeHistory,
    }),
    [addOpenOrder, addPosition, closeOpenOrder, closePosition, openOrders, positions, tradeHistory]
  );

  return <TradingContext.Provider value={providerStates}>{children}</TradingContext.Provider>;
}
