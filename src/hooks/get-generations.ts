import { usePokemonStore } from "@/store/use-pokemon-store";
import { GameClient } from "pokenode-ts";
import { useEffect } from "react";

export default function useGenerations() {
  const { genData, setGenData } = usePokemonStore();

  useEffect(() => {
    if (genData.length > 0) return;

    async function getGenerations(): Promise<void> {
      try {
        const api = new GameClient();
        const generations = await api.listGenerations();
        const generationList = generations.results.map(
          (generation) => generation.name,
        );
        setGenData(generationList);
      } catch (error) {
        console.log(error);
      }
    }
    void getGenerations();
  }, [genData, setGenData]);
}
