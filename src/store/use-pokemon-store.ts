import { Pokemon } from "pokenode-ts";
import { create } from "zustand";

interface PokemonStoreProps {
  pokeData: Pokemon[];
  setPokeData: (data: any[]) => void;
  genData: string[];
  setGenData: (data: string[]) => void;
  genId: number;
  setGenId: (data: number) => void;
  prevGenId: number;
  setPrevGenId: (data: number) => void;
  pokeList: string[];
  setPokeList: (data: string[]) => void;
}

export const usePokemonStore = create<PokemonStoreProps>((set) => ({
  pokeData: [],
  setPokeData: (data: Pokemon[]) => set({ pokeData: data }),
  genData: [],
  setGenData: (data: string[]) => set({ genData: data }),
  genId: 1,
  setGenId: (data: number) => set({ genId: data }),
  prevGenId: 0,
  setPrevGenId: (data: number) => set({ prevGenId: data }),
  pokeList: [],
  setPokeList: (data: string[]) => set({ pokeList: data }),
}));
