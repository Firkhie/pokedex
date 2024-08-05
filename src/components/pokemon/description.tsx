import { Pokemon, PokemonSpecies } from "pokenode-ts";
import DescriptionDefault from "./description-default";
import DescriptionMobile from "./description-mobile";

interface DescriptionProps {
  pokeDetail: Pokemon;
  pokeSpecies: PokemonSpecies;
}

export default function Description({
  pokeDetail,
  pokeSpecies,
}: DescriptionProps) {
  return (
    <div className="h-[80vh] w-full overflow-hidden p-5">
      <DescriptionDefault pokeDetail={pokeDetail} pokeSpecies={pokeSpecies} />
      <DescriptionMobile pokeDetail={pokeDetail} pokeSpecies={pokeSpecies} />
    </div>
  );
}
