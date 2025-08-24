"use client";
import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Menu,
  AppWindow,
  LogOut,
  LogIn,
  PieChart,
  TrendingUp,
  Plus,
} from "lucide-react";

export const NavbarMenu = ({ session }: { session: Session | null }) => {
  return (
    <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-lg font-bold text-gray-800"
            aria-label="Budget Tracker"
          >
            <Image
              src="/logo.svg"
              alt="Budget Tracker Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            Budget Tracker
          </Link>
          {!session ? (
            <div className="hidden space-x-4 md:flex">
              <Link
                href="/api/auth/signin"
                className="text-gray-300 hover:text-white"
              >
                <Button
                  className="border-1 text-gray-800"
                  size="lg"
                  variant="ghost"
                >
                  Sign In
                </Button>
              </Link>
              <Link
                href="/api/auth/signin"
                className="text-gray-300 hover:text-white"
              >
                <Button
                  className="bg-[#40DC34] text-[#ffffff] hover:bg-[#26FF59]"
                  size="lg"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden space-x-4 md:flex">
              <Link
                href="/api/auth/signout"
                className="text-gray-300 hover:text-white"
              >
                <Button
                  className="border-1 text-gray-800"
                  size="lg"
                  variant="ghost"
                >
                  Sign Out
                </Button>
              </Link>
              <Link href="/budget" className="text-gray-300 hover:text-white">
                <Button
                  className="bg-[#40DC34] text-[#ffffff] hover:bg-[#26FF59]"
                  size="lg"
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          )}
          {!session ? (
            <div className="flex items-center space-x-4 md:hidden">
              <Menubar className="flex space-x-4 md:hidden">
                <MenubarMenu>
                  <MenubarTrigger>
                    <Menu />
                  </MenubarTrigger>
                  <MenubarContent>
                    <Link href="/api/auth/signin" className="hover:text-white">
                      <MenubarItem>
                        <LogIn className="mr-2 h-5 w-5" />
                        Log In
                      </MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          ) : (
            <div className="flex md:hidden">
              <Menubar className="flex space-x-4">
                <MenubarMenu>
                  <MenubarTrigger>
                    <Menu />
                  </MenubarTrigger>
                  <MenubarContent>
                    <Link
                      href="/api/auth/signout"
                      className="text-gray-800 hover:text-black"
                    >
                      <MenubarItem>
                        <LogOut className="mr-2 h-5 w-5" />
                        Sign Out
                      </MenubarItem>
                    </Link>
                    <MenubarSeparator />
                    <Link
                      href="/budget"
                      className="font-bold text-gray-800 hover:text-black"
                    >
                      <MenubarItem>
                        <AppWindow className="mr-2 h-5 w-5" />
                        Dashboard
                      </MenubarItem>
                    </Link>
                    <Link
                      href="/AddItem?type=expense"
                      className="font-bold text-gray-800 hover:text-black"
                    >
                      <MenubarItem>
                        <Plus className="mr-2 h-5 w-5" />
                        Add Expense
                      </MenubarItem>
                    </Link>
                    <Link
                      href="/AddItem?type=income"
                      className="font-bold text-gray-800 hover:text-black"
                    >
                      <MenubarItem>
                        <TrendingUp className="mr-2 h-5 w-5" />
                        Add Income
                      </MenubarItem>
                    </Link>
                    <Link
                      href="/Reports?period=month&viewType=overview"
                      className="font-bold text-gray-800 hover:text-black"
                    >
                      <MenubarItem>
                        <PieChart className="mr-2 h-5 w-5" />
                        {/* todo: viewReport route */}
                        view Reports
                      </MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
