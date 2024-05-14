import { AccountSettingsMenu } from "@/app/(main)/_components/AccountSettingsMenu";
import GlobalSearch from "@/app/(main)/_components/GlobalSearch";
import MobileMenu from "@/app/(main)/_components/MobileMenu";
import { menuItems } from "@/app/(main)/_constants/menu-items";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Bell, Package2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <Link href='/' className='flex items-center gap-2 font-semibold'>
              <Package2 className='h-6 w-6' />
              <span className=''>Smart Budget</span>
            </Link>
            <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
              <Bell className='h-4 w-4' />
              <span className='sr-only'>Toggle notifications</span>
            </Button>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              {menuItems.map(({ id, href, name, icon: Icon }) => (
                <NavLink key={id} href={href}>
                  <Icon className='h-4 w-4' />
                  {name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <MobileMenu />
          <div className='w-full flex-1'>
            <GlobalSearch />
          </div>
          <AccountSettingsMenu userEmail={data.user.email!} />
        </header>

        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          {children}
        </main>
      </div>
    </div>
  );
}
