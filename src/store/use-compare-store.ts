import { Pokemon } from "pokenode-ts";
import { create } from "zustand";

interface CompareStoreProps {
  pokeData1: Pokemon | null;
  setPokeData1: (data: Pokemon) => void;
  pokeData2: Pokemon | null;
  setPokeData2: (data: Pokemon) => void;
}

export const useCompareStore = create<CompareStoreProps>((set) => ({
  pokeData1: null,
  setPokeData1: (data: Pokemon) => set({ pokeData1: data }),
  pokeData2: null,
  setPokeData2: (data: Pokemon) => set({ pokeData2: data }),
}));
