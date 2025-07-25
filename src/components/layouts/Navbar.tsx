import { Star } from "lucide-react";

export function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-5 border-b border-[#E9E9E9] bg-white sticky top-0 z-20">
      <img src="/logo.svg" alt="app_logo" className="h-9" />
      <div className="flex items-center space-x-4">
        <Star className="size-6" color="#1E1E1E" />
        <img src="/bell.svg" alt="notifications" className="size-6" />
      </div>
    </header>
  );
}
