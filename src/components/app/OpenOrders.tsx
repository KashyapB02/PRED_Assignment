import type { Trade, TradeHistory } from "@/context/trading";
import { OPEN_ORDER_TABS, type OpenOrderTab } from "@/data";
import { useTradingStates } from "@/hooks/useTradingStates";
import { Fragment, useMemo, useState } from "react";

export function OpenOrders() {
  const [activeTab, setActiveTab] = useState<OpenOrderTab["value"]>(OPEN_ORDER_TABS[0].value);
  const { openOrders, positions, tradeHistory, closeOpenOrder, closePosition } = useTradingStates();

  const tradeList = useMemo(() => {
    if (activeTab === "open_orders") return openOrders;
    if (activeTab === "positions") return positions;
    return tradeHistory;
  }, [activeTab, openOrders, positions, tradeHistory]);

  function handleCancelAll() {
    if (activeTab === "open_orders") {
      return openOrders.map((order) => closeOpenOrder(order));
    }
    if (activeTab === "positions") return positions.map((position) => closePosition(position));
  }

  function handleCancel(trade: Trade) {
    if (activeTab === "open_orders") return closeOpenOrder(trade);
    if (activeTab === "positions") return closePosition(trade);
  }

  return (
    <div>
      <section>
        <div className="px-6 py-2 gap-4 flex border-b border-t border-[#E9E9E9]">
          {OPEN_ORDER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`uppercase tracking-[1%] text-xs font-medium ${
                activeTab === tab.value ? "text-[#000000]" : "text-[#00000066]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>
      <section className="flex items-center px-6 py-3 border-b border-[#E9E9E9] justify-between mb-4">
        <div className="flex items-center gap-2">
          <input
            id="hide_other_pairs"
            name="hide_other_pairs"
            type="checkbox"
            className="w-[18px] h-[18px] rounded border-[#858585] border outline-none focus:border-[#858585] cursor-pointer"
          />
          <label htmlFor="hide_other_pairs" className="text-sm font-medium text-[#858585] cursor-pointer">
            Hide Other Pairs
          </label>
        </div>
        {activeTab !== "trade_history" && (
          <button
            className="text-sm h-6 w-[86px] bg-[#EAEAEA] text-[#000000] rounded leading-none"
            onClick={handleCancelAll}
          >
            Cancel All
          </button>
        )}
      </section>
      <section className="px-6 pb-6 space-y-2.5">
        {tradeList.map((trade) => (
          <Fragment key={trade.id}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium text-sm text-[#000000]">CSK / IPL Winner</div>
                <div className="text-[#858585] text-[10px]">
                  <span className={`${trade.type === "long" ? "text-[#56AB68]" : "text-red-700"}`}>
                    {trade.category === "limit" ? "Limit" : "Market"} {trade.type === "long" ? "Buy" : "Sell"}{" "}
                  </span>{" "}
                  {trade.createdAt}
                </div>
              </div>
              <div className="text-right items-center flex gap-2">
                <div className="flex flex-col items-center">
                  <div className="font-medium text-[#000000] text-xs">0%</div>
                  <div className="w-9 h-1 bg-[#E8DEF8] rounded-sm"></div>
                </div>
                {activeTab !== "trade_history" && (
                  <button
                    className="text-sm bg-[#EAEAEA] text-[#000000] px-2.5 py-1.5 rounded leading-none"
                    onClick={() => handleCancel(trade)}
                  >
                    Cancel
                  </button>
                )}
                {activeTab === "trade_history" && (
                  <span
                    className={`text-sm ${
                      (trade as TradeHistory).action === "close" ? "bg-[#A900221A]" : "bg-[#06A9001A]"
                    } text-[#000000] px-2.5 py-1.5 rounded leading-none`}
                  >
                    {(trade as TradeHistory).action === "open" ? "Opened" : "Cancelled"}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between">
                <span className="text-[#3B3B3B] ">Shares</span>
                <span className="text-[#000000]">{trade.shares}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#3B3B3B]">Price</span>
                <span className="text-[#000000]">{trade.usdPrice}¢</span>
              </div>
            </div>
          </Fragment>
        ))}
      </section>
    </div>
  );
}
