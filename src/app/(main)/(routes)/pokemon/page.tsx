"use client";

import Loader from "@/components/loader";
import PokemonCard from "@/components/pokemon-card";
import SearchBar from "@/components/search-bar";
import useGenerations from "@/hooks/get-generations";
import usePokemons from "@/hooks/get-pokemons";
import usePokemonsByGeneration from "@/hooks/get-pokemons-by-generation";
import { usePokemonStore } from "@/store/use-pokemon-store";
import { useRouteStore } from "@/store/use-route-store";
import Link from "next/link";
import { Pokemon } from "pokenode-ts";
import { useState } from "react";

export default function PokemonPage() {
  const { pokeData } = usePokemonStore();
  const { setFooterRoute } = useRouteStore();
  const [isLoadingGeneration, setIsLoadingGeneration] =
    useState<boolean>(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);

  usePokemonsByGeneration(setIsLoadingGeneration);
  usePokemons();
  useGenerations();

  const displayData = searchResults.length > 0 ? searchResults : pokeData;

  return (
    <div className="flex h-full w-full flex-col items-center gap-y-2 py-2 md:gap-y-4 md:py-4">
      <SearchBar
        setSearchResults={setSearchResults}
        setIsLoading={setIsLoadingSearch}
      />
      <div className="mt-5 h-[60vh] w-full overflow-hidden px-5 md:mt-10 md:px-10">
        {isLoadingGeneration || isLoadingSearch ? (
          <Loader />
        ) : (
          <div className="grid h-full w-full grid-cols-1 gap-5 overflow-auto scrollbar-hide sm:grid-cols-2 md:gap-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {displayData.map((poke) => (
              <Link
                href={`/pokemon/${poke.id}`}
                key={poke.id}
                className="hover:shadow-2xl"
                onClick={() => setFooterRoute("description")}
              >
                <PokemonCard
                  id={poke.id}
                  name={poke.name}
                  sprite={
                    poke.sprites.other?.["official-artwork"].front_default!
                  }
                  types={poke.types}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
