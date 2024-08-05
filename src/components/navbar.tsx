"use client";

import Image from "next/image";
import Link from "next/link";

import { GitCompare, LogIn, Menu, PawPrint, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

const routes = [
  {
    name: "Pokemon",
    path: "/pokemon",
    icon: PawPrint,
  },
  {
    name: "Compare",
    path: "/compare",
    icon: GitCompare,
  },
  {
    name: "Favorites",
    path: "/favorites",
    icon: Star,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActiveRoute = (routePath: string) => {
    return pathname.startsWith(routePath);
  };

  return (
    <div className="flex h-full w-full items-center justify-between text-white">
      {/* Left */}
      <div className="flex h-full w-[10vh] items-center justify-center border-r border-[#222c38]">
        <Link
          href="/"
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center"
        >
          <Image alt="logo" src="/logo.png" fill className="object-cover" />
        </Link>
      </div>
      {/* Mid */}
      <div className="hidden h-full w-full flex-1 items-center justify-center gap-x-14 md:flex">
        {routes.map((route) => (
          <Link
            key={route.name}
            href={route.path}
            className="relative flex h-full items-center"
          >
            <p className="text-lg font-bold uppercase tracking-widest">
              {route.name}
            </p>
            {isActiveRoute(route.path) && (
              <div className="absolute bottom-0 left-0 h-1 w-full rounded-sm bg-white"></div>
            )}
          </Link>
        ))}
      </div>
      {/* Right */}
      <div className="flex h-full w-[10vh] items-center justify-center border-l border-[#222c38]">
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm bg-[#222c38] p-[10px] hover:bg-opacity-70">
          <LogIn className="hidden md:flex" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu className="md:hidden" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5 mt-3 border-[#020818] bg-[#020818] text-zinc-200">
              {routes.map((route) => (
                <Link key={route.name} href={route.path}>
                  <DropdownMenuItem className="flex w-full items-center justify-between gap-x-8">
                    <p className="text-sm">{route.name}</p>
                    <route.icon className="h-4 w-4" />
                  </DropdownMenuItem>
                </Link>
              ))}
              <Link href="/login">
                <DropdownMenuSeparator className="bg-[#212222]" />
                <DropdownMenuItem className="flex w-full items-center justify-between">
                  <p className="text-sm">Login</p>
                  <LogIn className="h-4 w-4" />
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
