import React from "react";
import BottomBar from "./bottom-bar";
import { cn } from "./lib/utils";
import { ViewType } from "./types/view";

function MobileLayout({
  children,
  setView,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  setView: (setView: ViewType) => void;
}) {
  return (
    <div
      className={cn(
        "flex h-dvh select-none flex-col justify-between pt-4",
        className,
      )}
    >
      {children}
      <BottomBar setView={setView} />
    </div>
  );
}

export default MobileLayout;
