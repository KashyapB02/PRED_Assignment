export function TradingHeader() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <img src="/team-logo.svg" alt="team-logo" className="mr-2 size-12 object-contain" />
        <div>
          <h1 className="font-semibold text-[#000000] text-lg">Chennai Super Kings</h1>
          <p className="text-xs font-medium leading-none text-[#8F8F8F]">+65.2M Vol.</p>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <div className="text-right">
            <h2 className="text-lg font-semibold text-[#000000]">34¢</h2>
            <p className="text-[#06A900] leading-none text-xs font-medium">+0.84%</p>
          </div>
          <img src="/bar-chart.svg" alt="bar-chart" className="size-9" />
        </div>
      </div>
    </section>
  );
}
