import type { DropdownOptions } from "@/data";
import { Info } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";

type DropdownProps = {
  defaultValue: DropdownOptions["value"];
  options: Array<DropdownOptions>;
  onSelectionChange: (value: string) => void;
};

export function Dropdown({ defaultValue, options, onSelectionChange }: Readonly<DropdownProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<DropdownOptions["value"]>(defaultValue);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentSelectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue) ?? options[0],
    [options, selectedValue]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleSelect(option: string) {
    setSelectedValue(option);
    setIsOpen(false);
    onSelectionChange(option);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-6 flex items-center justify-between p-1 bg-[#F5F5F5] rounded-[4px] border border-[#E9E9E9]"
      >
        <div className="flex items-center gap-2">
          <Info className="size-4" color="#1F1F1F" />
          <span className="text-[#000000] text-xs font-medium">{currentSelectedOption.label}</span>
        </div>
        <img
          src="/arrow.svg"
          alt="arrow"
          width={8}
          height={8}
          className={`size-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-0.5 bg-white border border-gray-200 rounded-[4px] shadow-lg z-10">
          {options.map((option) => (
            <button
              key={new Date().getTime()}
              disabled={option.value === ""}
              onClick={() => handleSelect(option.value)}
              className="w-full py-1 px-2 text-left text-xs font-medium hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150"
            >
              <span className="text-gray-800">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
