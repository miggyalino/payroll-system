import { NAVBAR_ITEMS } from "@/constants";
import { OrangeButton } from "./OrangeButton";
import { BookUser, Building2, HandCoins, LayoutGrid } from "lucide-react";
import Link from "next/link";
type NavbarItem = {
  icon: string;
  title: string;
  href: string;
};
type NavpillProps = {
  NAVBAR_ITEMS: NavbarItem[];
  selectedNavbar: string;
  onSelect: (item: string) => void;
};

export function Navpill({
  NAVBAR_ITEMS,
  selectedNavbar,
  onSelect,
}: NavpillProps) {
  return (
    <div className="flex flex-col justify-center gap-5 px-10 py-10">
      {NAVBAR_ITEMS.map((item) => (
        <OrangeButton
          key={item.title}
          onClick={() => onSelect(item.title)}
          className=" flex flex-row justify-between items-center"
          variant={selectedNavbar === item.title ? "orange" : "ghost"}
        >
          {item.icon === "dashboard-icon" ? (
            <LayoutGrid size={20} />
          ) : item.icon === "company-icon" ? (
            <Building2 size={20} />
          ) : item.icon === "employee-icon" ? (
            <BookUser size={20} />
          ) : item.icon === "payroll-icon" ? (
            <HandCoins size={20} />
          ) : null}
          <Link href={item.href} className="text-base">
            {item.title}
          </Link>
        </OrangeButton>
      ))}
    </div>
  );
}
