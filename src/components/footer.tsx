"use client";

import { useRouteStore } from "@/store/use-route-store";
import { LandPlot, Move, NotebookText, Squirrel } from "lucide-react";
import { usePathname } from "next/navigation";

const routes = [
  {
    name: "description",
    icon: NotebookText,
  },
  {
    name: "evolutions",
    icon: Squirrel,
  },
  {
    name: "moves",
    icon: Move,
  },
  {
    name: "encounter areas",
    icon: LandPlot,
  },
];

export default function Footer() {
  const pathname = usePathname();
  const { footerRoute, setFooterRoute } = useRouteStore();

  const isPokemonDetailPage = /^\/pokemon\/\d+$/.test(pathname);

  return (
    <div className="flex h-full w-full items-center justify-between text-white">
      <div className="hidden h-full w-[10vh] border-r border-[#222c38] lg:flex"></div>
      <div className="grid h-full flex-1 grid-cols-4">
        {isPokemonDetailPage &&
          routes.map((route) => (
            <div
              key={route.name}
              onClick={() => setFooterRoute(route.name)}
              className={`flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-2 ${footerRoute === route.name ? "bg-white text-black" : ""}`}
            >
              <route.icon className="flex h-4 w-4 sm:h-6 sm:w-6 lg:hidden" />
              <p className="text-center text-[10px] uppercase tracking-widest sm:text-sm lg:flex lg:text-lg lg:font-bold">
                {route.name}
              </p>
            </div>
          ))}
      </div>
      <div className="hidden h-full w-[10vh] border-l border-[#222c38] lg:flex"></div>
    </div>
  );
}
