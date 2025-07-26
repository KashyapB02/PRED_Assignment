import { startTransition, useState } from "react";
import { Dropdown } from "./Dropdown";
import { LIMIT_DROPDOWN_OPTIONS } from "@/data";
import Slider from "./Slider";
import { useTradingStates } from "@/hooks/useTradingStates";
import type { Trade } from "@/context/trading";

type TradeTabs = "long" | "short";
type TradeCategory = "limit" | "market";

export function TradeSection() {
  const [activeTab, setActiveTab] = useState<TradeTabs>("long");
  const [usdPrice, setUsdPrice] = useState<string>("");
  const [shares, setShares] = useState<string>("");
  const [tradeCategory, setTradeCategory] = useState<TradeCategory>("limit");
  const [percentage, setPercentage] = useState<number>(0);

  const { addOpenOrder, addPosition } = useTradingStates();

  function createTrade() {
    const usdPriceInNumber = Number(usdPrice);
    const sharesInNumber = Number(shares);

    if (!usdPriceInNumber || !sharesInNumber) return;

    const trade: Trade = {
      id: crypto.randomUUID(),
      category: tradeCategory,
      shares: sharesInNumber,
      usdPrice: usdPriceInNumber,
      type: activeTab,
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    startTransition(() => {
      setUsdPrice("");
      setShares("");
    });

    if (tradeCategory === "limit") return addOpenOrder(trade);
    return addPosition(trade);
  }

  return (
    <section>
      <div className="flex h-9 border border-[#E9E9E9] rounded-[4px] p-[1px] bg-[#F5F5F5]">
        <button
          onClick={() => setActiveTab("long")}
          className={`flex-1 p-1.5 text-xs font-semibold rounded-[2px] ${
            activeTab === "long" ? "bg-[#2B2B2B] text-[#EAEAEA]" : "bg-[#F5F5F5] text-[#00000080]"
          }`}
        >
          BUY/LONG
        </button>
        <button
          onClick={() => setActiveTab("short")}
          className={`flex-1 p-1.5 text-xs font-semibold rounded-[2px] ${
            activeTab === "short" ? "bg-[#2B2B2B] text-[#EAEAEA]" : "bg-[#F5F5F5] text-[#00000080]"
          }`}
        >
          SELL/SHORT
        </button>
      </div>
      <div className="mb-2.5 mt-2">
        <Dropdown
          defaultValue="limit"
          options={LIMIT_DROPDOWN_OPTIONS}
          onSelectionChange={(value) => setTradeCategory(value as TradeCategory)}
        />
      </div>
      <div className="mb-[5px]">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-[#000000] underline leading-none">Available to Trade</span>
          <span className="text-xs font-medium text-[#000000]">0.00 USDC</span>
        </div>
      </div>
      <div className="h-9 p-2.5 rounded bg-[#F5F5F5] border border-[#E9E9E9]">
        <div className="flex justify-between gap-1 items-center">
          <input
            id="usd_price"
            name="usd_price"
            type="number"
            value={usdPrice}
            onChange={(event) => setUsdPrice(event.target.value)}
            onWheel={(event) => event.currentTarget.blur()}
            placeholder="Price (USD)"
            className="text-xs font-medium text-[#000000] bg-transparent outline-none placeholder-[#00000080] w-[100%] min-w-0"
          />
          <p className="text-xs text-nowrap font-medium text-[#000000]">
            34.5 <span className="underline text-[#000000]">Mid</span>
          </p>
        </div>
      </div>
      <div className="h-9 p-2.5 mt-2 rounded bg-[#F5F5F5] border border-[#E9E9E9]">
        <div className="flex justify-between items-center">
          <input
            id="shares"
            name="shares"
            type="number"
            value={shares}
            onChange={(event) => setShares(event.target.value)}
            onWheel={(event) => event.currentTarget.blur()}
            placeholder="Shares"
            className="text-xs font-medium text-[#000000] bg-transparent outline-none placeholder-[#00000080] w-full min-w-0"
          />
        </div>
      </div>
      <div className="mb-[13px] mt-2">
        <Slider initialValue={0} onChange={(value) => setPercentage(value)} />
      </div>
      <div className="h-1 w-full bg-[#ECECEC]"></div>
      <div className="space-y-2.5 mb-3 mt-2">
        <div className="flex justify-between">
          <span className="text-[#000000] text-xs  font-medium">Order Total</span>
          <span className="text-[#000000] text-xs  font-medium">${Number(usdPrice) * Number(shares)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#000000] text-xs  font-medium">To Win 💵</span>
          <span className="text-[#000000] text-xs  font-medium">
            {activeTab === "long" ? "" : "-"}${(Number(shares) * Number(usdPrice) * (percentage / 100)).toFixed(2)}
          </span>
        </div>
      </div>
      <button
        className="w-full h-9 bg-[#2B2B2B] text-[#FFFFFF] p-2.5 rounded font-semibold text-xs"
        onClick={createTrade}
      >
        {activeTab === "long" ? "BUY/LONG CSK" : "SELL/SHORT CSK"}
      </button>
    </section>
  );
}
