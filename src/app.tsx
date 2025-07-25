import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layouts";
import { NoScreen, TradingScreen } from "./screens";

export function PredAssignment() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<TradingScreen />} />
        <Route path="*" element={<NoScreen />} />
      </Routes>
    </AppLayout>
  );
}
