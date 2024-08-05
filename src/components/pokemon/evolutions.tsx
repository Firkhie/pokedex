import Link from "next/link";
import { Pokemon } from "pokenode-ts";
import PokemonCard from "../pokemon-card";
import { useRouteStore } from "@/store/use-route-store";
import Loader from "../loader";

interface EvolutionsProps {
  pokeEvolutions: Pokemon[];
  isLoading: boolean;
}

export default function Evolutions({
  pokeEvolutions,
  isLoading,
}: EvolutionsProps) {
  const { setFooterRoute } = useRouteStore();

  return (
    <div className="h-[80vh] w-full overflow-hidden p-5">
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`grid h-full w-full gap-5 overflow-auto scrollbar-hide ${
            pokeEvolutions.length === 1
              ? "grid-cols-1"
              : pokeEvolutions.length === 2
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1 lg:grid-cols-3"
          }`}
        >
          {pokeEvolutions.map((poke) => (
            <Link
              href={`/pokemon/${poke.id}`}
              key={poke.id}
              className="hover:shadow-2xl h-fit"
              onClick={() => setFooterRoute("description")}
            >
              <PokemonCard
                id={poke.id}
                name={poke.name}
                sprite={poke.sprites.other?.["official-artwork"].front_default!}
                types={poke.types}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
