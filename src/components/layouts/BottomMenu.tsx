import { BOTTOM_MENU_ITEMS } from "@/data";
import { Link, useLocation } from "react-router-dom";

export function BottomMenu() {
  const { pathname } = useLocation();

  return (
    <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[412px] bg-white border-t border-gray-200 py-3 z-20">
      <nav>
        <ul className="flex justify-around py-1.5  font-medium">
          {BOTTOM_MENU_ITEMS.map((item) => (
            <li key={item.id}>
              <Link to={item.route} className="flex flex-col items-center">
                <img src={item.icon} alt={`${item.id}_icon`} width={24} height={24} className="size-6" />
                <span className={`text-sm ${pathname === item.route ? "text-gray-900" : "text-[#858585]"} mt-0.5`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
