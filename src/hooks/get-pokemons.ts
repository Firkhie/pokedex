import { usePokemonStore } from "@/store/use-pokemon-store";
import { PokemonClient } from "pokenode-ts";
import { useEffect } from "react";

export default function usePokemons() {
  const { pokeList, setPokeList } = usePokemonStore();
  useEffect(() => {
    if (pokeList.length > 0) return;
    
    async function getPokemons(): Promise<void> {
      const api = new PokemonClient();
      const pokemons = await api.listPokemons(0, 100_000);
      setPokeList(pokemons.results.map((pokemon) => pokemon.name));
    }
    void getPokemons();
  }, [pokeList, setPokeList]);
}
