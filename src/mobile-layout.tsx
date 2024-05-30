import React from "react";
import BottomBar from "./bottom-bar";
import { cn } from "./lib/utils";
import { ViewType } from "./types/view";

function MobileLayout({
  children,
  view,
  setView,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  setView: (setView: ViewType) => void;
  view: string;
}) {
  return (
    <div
      className={cn(
        "flex h-dvh select-none flex-col justify-between pt-4",
        className,
      )}
    >
      {children}
      <BottomBar setView={setView} view={view} />
    </div>
  );
}

export default MobileLayout;
