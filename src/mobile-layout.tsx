import React from "react";
import BottomBar from "./bottom-bar";
import { ViewType } from "./types/view";

function MobileLayout({
  children,
  setView,
}: {
  children: React.ReactNode;
  setView: (setView: ViewType) => void;
}) {
  return (
    <div className="flex h-dvh touch-none select-none grid-cols-[1fr_3fr] flex-col pt-4">
      {children}
      <BottomBar setView={setView} />
    </div>
  );
}

export default MobileLayout;
