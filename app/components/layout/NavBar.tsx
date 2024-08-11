import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ThemeToggle } from './ThemeToggle';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartButton } from './CartButton';

export async function NavBar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="bg-background text-foreground py-4 border-b">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/pfc.svg" alt="Pakistan Fragrance Community" width={60} height={60} priority />
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/european-niche" className="text-lg hover:text-primary transition-colors">
              European Niche
            </Link>
            <Link href="/mbp" className="text-lg hover:text-primary transition-colors">
              Made by Pakistan
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <CartButton />
            {await isAuthenticated() ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-10 h-10 rounded-full p-0">
                    <Avatar>
                      <AvatarImage src={user?.picture ?? ''} alt={user?.given_name ?? 'User avatar'} />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <LogoutLink className="w-full">Log out</LogoutLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <LoginLink>
                  <Button variant="ghost">Login</Button>
                </LoginLink>
                <RegisterLink>
                  <Button>Sign Up</Button>
                </RegisterLink>
              </>
            )}
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  <Link href="/european-niche">European Niche</Link>
                  <Link href="/mbp">Made by Pakistan</Link>
                  {await isAuthenticated() ? (
                    <>
                      <Link href="/profile">Profile</Link>
                      <Link href="/orders">Orders</Link>
                      <Link href="/settings">Settings</Link>
                      <LogoutLink>Log out</LogoutLink>
                    </>
                  ) : (
                    <>
                      <LoginLink>Login</LoginLink>
                      <RegisterLink>Sign Up</RegisterLink>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}