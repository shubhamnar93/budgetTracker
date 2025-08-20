import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-screen bg-blue-500 pt-4 pb-4 text-[#ffffff]">
      <div className="mr-5 ml-5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-lg font-bold text-[#ffffff]"
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
        <div className="space-x-4">
          <Link
            href="/api/auth/signin"
            className="text-gray-300 hover:text-white"
          >
            <Button
              className="border-1 text-[#ffffff]"
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
      </div>
    </nav>
  );
};
