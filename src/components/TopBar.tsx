import React from "react";

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <header className="fixed inset-0 top-0 h-[3.75rem] border-b-[1px]">
      TopBar
    </header>
  );
};

export default TopBar;
