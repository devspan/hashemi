import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShoppingCart, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ThemeToggle } from './ThemeToggle';

export async function NavBar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="bg-background text-foreground py-4 border-b hidden md:block">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/pfc.svg" alt="Pakistan Fragrance Community" width={60} height={60} />
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link href="/european-niche" className="text-lg hover:text-primary">
              European Niche
            </Link>
          </li>
          <li>
            <Link href="/mbp" className="text-lg hover:text-primary">
              Made by Pakistan
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <Button variant="ghost">
                <ShoppingCart className="w-5 h-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
          </li>
          {await isAuthenticated() ? (
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-10 rounded-full p-0">
                    <Avatar>
                      <AvatarImage src={user?.picture ?? ''} alt="Avatar" />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogoutLink>Log out</LogoutLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ) : (
            <>
              <li>
                <LoginLink>
                  <Button variant="secondary">Login</Button>
                </LoginLink>
              </li>
              <li>
                <RegisterLink>
                  <Button variant="default">Sign Up</Button>
                </RegisterLink>
              </li>
            </>
          )}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}