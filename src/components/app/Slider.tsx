import { useState } from "react";

type SliderProps = {
  initialValue: number;
  onChange: (value: number) => void;
};

function Slider({ initialValue, onChange }: Readonly<SliderProps>) {
  const [value, setValue] = useState<SliderProps["initialValue"]>(initialValue);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center ml-2.5 gap-3">
      <div className="flex-1 relative">
        <div className="relative w-full">
          <div className="w-full h-0.5 bg-[#D9D9D9] rounded-full"></div>
          <div className="absolute inset-0 flex justify-between items-center">
            {[0, 25, 50, 75, 100].map((mark: number) => (
              <div key={mark} className="w-[2px] h-[7px] bg-[#D9D9D9]"></div>
            ))}
          </div>
          <button
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-[#D9D9D9] rounded-full cursor-pointer shadow-sm flex items-center justify-center z-10"
            style={{
              left: `${value}%`,
              transform: "translateX(-50%) translateY(-50%)",
            }}
            onMouseDown={(event) => {
              const slider = event.currentTarget.parentElement;
              if (!slider) return;

              const rect = slider.getBoundingClientRect();

              const handleMouseMove = (e: MouseEvent) => {
                const newValue = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                handleValueChange(Math.max(0, Math.min(100, newValue)));
              };

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          >
            <div className="w-3 h-3 bg-[#404040] rounded-full"></div>
          </button>
          <button
            className="absolute inset-0 cursor-pointer"
            onClick={(event) => {
              const rectangle = event.currentTarget.getBoundingClientRect();
              const newValue = Math.round(((event.clientX - rectangle.left) / rectangle.width) * 100);
              handleValueChange(Math.max(0, Math.min(100, newValue)));
            }}
          ></button>
        </div>
      </div>
      <div className="bg-[#F5F5F5] rounded border border-[#E9E9E9] w-12 h-9 flex items-center justify-center">
        <span className="text-[#00000066] text-xs font-medium">{value} %</span>
      </div>
    </div>
  );
}

export default Slider;
