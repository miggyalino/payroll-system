"use client";

import { HandCoins } from "lucide-react";
import { SidebarOptions } from "./SidebarOptions";
import { NAVBAR_ITEMS } from "@/constants";
import { useState } from "react";

export function Sidebar() {
  const [selectedOption, setSelectedOption] = useState(NAVBAR_ITEMS[0].title);
  return (
    <div className="min-h-screen bg-slate-800 w-1/7">
      <nav className="flex flex-col  text-white">
        <div className="flex items-center gap-2 p-8">
          <HandCoins size={32} color="#281cce" strokeWidth={2.25} />
          <h1 className="text-lg font-bold">Payroll Management</h1>
        </div>
        <SidebarOptions
          NAVBAR_ITEMS={NAVBAR_ITEMS}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
        />
      </nav>
    </div>
  );
}
