"use client";

import { Check, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePokemonStore } from "@/store/use-pokemon-store";
import { useDebounce } from "use-debounce";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Pokemon, PokemonClient } from "pokenode-ts";

interface SearchBarProps {
  setSearchResults: (results: Pokemon[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export default function SearchBar({
  setSearchResults,
  setIsLoading,
}: SearchBarProps) {
  const { genData, setGenId, genId, pokeList } = usePokemonStore();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchPokeSearch(search: string) {
      try {
        setIsLoading(true);
        if (search) {
          const names = pokeList.filter((pokemon) =>
            pokemon.startsWith(search.toLowerCase()),
          );
          const api = new PokemonClient();
          const pokePromise = names.map((name) => api.getPokemonByName(name));
          const pokemons = await Promise.all(pokePromise);
          setSearchResults(pokemons);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPokeSearch(debouncedSearchTerm);
  }, [pokeList, debouncedSearchTerm, setSearchResults, setIsLoading]);

  return (
    <div className="mt-5 flex h-12 w-full items-center gap-x-2 px-5 md:px-10 lg:w-4/5 lg:px-0">
      <div className="flex h-full w-full items-center gap-x-1 rounded-sm bg-neutral-500 bg-opacity-40 px-3 py-1 text-white">
        <Search />
        <Input
          className="bg-transparent !placeholder-gray-400"
          style={{ border: "none", boxShadow: "none" }}
          placeholder="Search a pokemon..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex h-full cursor-pointer items-center justify-center rounded-sm bg-[#222c38] px-3 py-1 text-white hover:bg-opacity-70">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Filter />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-5 border-[#020818] bg-[#020818] text-zinc-200">
            {genData.map((gen, index) => (
              <DropdownMenuItem
                key={gen}
                className="flex w-full cursor-pointer items-center justify-between gap-x-8"
                onClick={() => setGenId(index + 1)}
              >
                <p className="text-sm uppercase">{gen}</p>
                {genId === index + 1 && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
