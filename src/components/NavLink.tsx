"use client";

import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLink = ({
  children,
  href,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  [key: string]: any;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:bg-muted/50 hover:text-foreground",
        isActive && "bg-accent text-accent-foreground"
      )}
    >
      {children}
    </Link>
  );
};
