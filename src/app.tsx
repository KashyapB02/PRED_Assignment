import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layouts";
import { NoScreen, TradingScreen } from "./screens";
import { TradingProvider } from "./context/trading";

export function PredAssignment() {
  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={
            <TradingProvider>
              <TradingScreen />
            </TradingProvider>
          }
        />
        <Route path="*" element={<NoScreen />} />
      </Routes>
    </AppLayout>
  );
}
