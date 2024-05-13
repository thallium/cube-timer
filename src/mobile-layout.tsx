import React from "react";
import BottomBar from "./bottom-bar";

function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh touch-none select-none grid-cols-[1fr_3fr] flex-col pt-4">
      {children}
      <BottomBar />
    </div>
  );
}

export default MobileLayout;
