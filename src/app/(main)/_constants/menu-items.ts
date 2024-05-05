import {DollarSign, type LucideIcon} from "lucide-react";

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
    id: "expanses",
    name: "Expanses",
    href: "/expanses",
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
