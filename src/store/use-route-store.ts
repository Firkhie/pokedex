import { create } from "zustand";

interface RouteStoreProps {
  footerRoute: string;
  setFooterRoute: (data: string) => void;
}

export const useRouteStore = create<RouteStoreProps>((set) => ({
  footerRoute: "description",
  setFooterRoute: (data: string) => set({ footerRoute: data }),
}));
