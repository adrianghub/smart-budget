"use client";

import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Home, Menu, Package2} from "lucide-react";
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
        <Link
          href='#'
          className='mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'
        >
          <Home className='h-5 w-5' />
          Dashboard
        </Link>
      </nav>
    </SheetContent>
  </Sheet>
);

export default MobileMenu;
