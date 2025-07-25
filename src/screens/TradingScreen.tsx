import { OpenOrders, PriceList, TradeSection, TradingHeader } from "@/components/app";

export function TradingScreen() {
  return (
    <div className="w-full py-5 flex flex-col gap-6">
      <div className="px-6">
        <TradingHeader />
        <div className="mt-6 grid grid-cols-[1fr_135px] items-start gap-3 sm:gap-4">
          <TradeSection />
          <PriceList />
        </div>
      </div>
      <OpenOrders />
    </div>
  );
}
