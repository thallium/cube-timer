import React from "react";
import DesktopSettings from "./DesktopSettings";
import EventSwitch from "./event-switch";
import SessionSwitch from "./session-switch";

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <header className="fixed inset-0 top-0 flex h-[3.75rem] justify-between border-b-[1px] px-4">
      <div className="flex items-center justify-start gap-4">
        <h1 className="text-2xl font-bold">Tl Timer</h1>
        <SessionSwitch />
      </div>
      <div className="flex items-center justify-end gap-4">
        <EventSwitch />
        <DesktopSettings />
      </div>
    </header>
  );
};

export default TopBar;
