import { ORDER_BOOK_DATA, type OrderBookData } from "@/data";

function getPriceBgColor(type: OrderBookData["type"]) {
  if (type === "buy") return "#06A9001A";
  if (type === "sell") return "#A900221A";
  return "#FFFFFF";
}

const formatter = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function PriceList() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <span className="text-[#000000B2] font-medium text-xs">Price</span>
        <span className="text-[#000000B2] font-medium text-xs">Shares (CSK)</span>
      </div>
      <ul className="space-y-[2px] mt-2.5">
        {ORDER_BOOK_DATA.map((item) => {
          const bgColor = getPriceBgColor(item.type);

          return (
            <li
              key={item.id}
              className="flex items-center justify-between h-[22px]"
              style={{
                background: `linear-gradient(to right, ${bgColor} ${item.progress}%, transparent ${item.progress}%)`,
                ...(item.current && { margin: "7px 0px" }),
              }}
            >
              <span
                className={`${
                  item.current ? "text-sm font-medium text-[#000000]" : "text-xs font-medium text-[#00000099]"
                }`}
              >
                {item.price}¢
              </span>

              {item.current ? (
                <span className="text-[10px] font-medium text-[#000000]">(Spread 1%)</span>
              ) : (
                <span className="text-xs font-medium text-[#00000099]">
                  {formatter.format(parseFloat(item.shares.toFixed(2)))}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
