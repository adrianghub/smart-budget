import { DollarSign, type LucideIcon } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  href: string;
  icon: LucideIcon;
}

export const menuItems: MenuItem[] = [
  // {
  //   id: "dashboard",
  //   name: "Dashboard",
  //   href: "/dashboard",
  // icon: Home,
  // },
  {
    id: "transactions",
    name: "Transactions",
    href: "/transactions",
    icon: DollarSign,
  },
  {
    id: "wallets",
    name: "Wallets",
    href: "/wallets",
    icon: DollarSign,
  },
  // {
  //   id: "categories",
  //   name: "Categories",
  //   href: "/categories",
  // },
  // {
  //   id: "reports",
  //   name: "Reports",
  //   href: "/reports",
  // },
  // {
  //   id: "settings",
  //   name: "Settings",
  //   href: "/settings",
  // },
];
