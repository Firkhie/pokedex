import { usePokemonStore } from "@/store/use-pokemon-store";
import { GameClient, PokemonClient } from "pokenode-ts";
import { useEffect } from "react";

export default function usePokemonsByGeneration(
  setLoading: (loading: boolean) => void,
) {
  const { setPokeData, genId, setPrevGenId, prevGenId } = usePokemonStore();

  useEffect(() => {
    async function getPokemonsByGeneration(id: number) {
      setLoading(true);
      try {
        const gameClient = new GameClient();
        const pokeClient = new PokemonClient();

        const generation = await gameClient.getGenerationById(id);
        const sortedPoke = generation.pokemon_species.sort((a, b) => {
          const aPoke = parseInt(a.url.split("/")[6]);
          const bPoke = parseInt(b.url.split("/")[6]);
          return aPoke - bPoke;
        });

        const pokeIds = sortedPoke.map((poke) =>
          Number(poke.url.split("/")[6]),
        );

        if (pokeIds.length > 0) {
          const pokePromise = pokeIds.map((pokeId) =>
            pokeClient.getPokemonById(pokeId),
          );
          const pokemons = await Promise.all(pokePromise);
          setPokeData(pokemons);
        } else {
          setPokeData([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (genId !== prevGenId) {
      setPrevGenId(genId);
      void getPokemonsByGeneration(genId);
    }
  }, [setPokeData, genId, prevGenId, setPrevGenId, setLoading]);
}
