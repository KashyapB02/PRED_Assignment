import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { BottomMenu } from "./BottomMenu";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: Readonly<AppLayoutProps>) {
  return (
    <main className="max-w-[412px] min-h-svh mx-auto bg-white pb-16 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">{children}</main>
      <BottomMenu />
    </main>
  );
}
