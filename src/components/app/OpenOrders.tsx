import { OPEN_ORDER_TABS, type OpenOrderTab } from "@/data";
import { useState } from "react";

export function OpenOrders() {
  const [activeTab, setActiveTab] = useState<OpenOrderTab["value"]>(OPEN_ORDER_TABS[0].value);

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
        <button className="text-sm h-6 w-[86px] bg-[#EAEAEA] text-[#000000] rounded leading-none">Cancel All</button>
      </section>
      <section className="px-6 pb-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-medium text-sm text-[#000000]">CSK / IPL Winner</div>
            <div className="text-[#858585] text-[10px]">
              <span className="text-[#56AB68]">Limit buy </span> 2025-06-03 14:57:23
            </div>
          </div>
          <div className="text-right items-center flex gap-2">
            <div className="flex flex-col items-center">
              <div className="font-medium text-[#000000] text-xs">0%</div>
              <div className="w-9 h-1 bg-[#E8DEF8] rounded-sm"></div>
            </div>
            <button className="text-sm bg-[#EAEAEA] text-[#000000] px-2.5 py-1.5 rounded leading-none">Cancel</button>
          </div>
        </div>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-[#3B3B3B] ">Filled / Amount</span>
            <span className="text-[#000000]">
              0.00 /<span className="text-[#858585]"> 0.01</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#3B3B3B]">Price</span>
            <span className="text-[#000000]">30¢</span>
          </div>
        </div>
      </section>
    </div>
  );
}
