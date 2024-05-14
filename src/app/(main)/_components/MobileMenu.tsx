"use client";

import { menuItems } from "@/app/(main)/_constants/menu-items";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package2 } from "lucide-react";
import Link from "next/link";

const MobileMenu = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
        <Menu className='h-5 w-5' />
        <span className='sr-only'>Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side='left' className='flex flex-col'>
      <nav className='grid gap-2 text-lg font-medium'>
        <Link
          href='#'
          className='flex items-center gap-2 text-lg font-semibold'
        >
          <Package2 className='h-6 w-6' />
          <span className='sr-only'>Smart Budget</span>
        </Link>
        {menuItems.map(({ id, href, name, icon: Icon }) => (
          <NavLink key={id} href={href}>
            <Icon className='h-5 w-5' />
            {name}
          </NavLink>
        ))}
      </nav>
    </SheetContent>
  </Sheet>
);

export default MobileMenu;
