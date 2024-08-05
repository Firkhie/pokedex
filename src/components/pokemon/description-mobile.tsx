import Image from "next/image";
import { Pokemon, PokemonSpecies } from "pokenode-ts";
import { Progress } from "@/components/ui/progress";

interface DescriptionMobileProps {
  pokeDetail: Pokemon;
  pokeSpecies: PokemonSpecies;
}

export default function DescriptionMobile({
  pokeDetail,
  pokeSpecies,
}: DescriptionMobileProps) {
  return (
    <div className="h-full w-full overflow-auto scrollbar-hide">
      <div className="grid h-full w-full grid-cols-1 place-items-center gap-y-10 text-white md:hidden">
        <div className="flex w-full justify-between">
          <div className="flex gap-x-3">
            <h3 className="text-xl font-bold uppercase">{pokeDetail.name}</h3>
            <p className="text-sm font-semibold">#{pokeDetail.id}</p>
          </div>
          <div className="flex gap-x-3">
            {pokeDetail.types.map((item) => (
              <div
                key={item.type.name}
                className="flex flex-col items-center gap-y-2"
              >
                <div className="relative h-[40px] w-[40px]">
                  <Image
                    alt={item.type.name}
                    src={`/types/${item.type.name}.png`}
                    fill
                  />
                </div>
                <p className="text-sm uppercase">{item.type.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[250px] w-[250px]">
          <Image
            alt="pokemon"
            src={pokeDetail.sprites.other?.["official-artwork"].front_default!}
            fill
          />
        </div>
        <div className="w-full">
          <p className="text-center font-light">
            {
              pokeSpecies.flavor_text_entries.find(
                (e) => e.language.name === "en",
              )?.flavor_text
            }
          </p>
        </div>
        <div className="flex w-full gap-x-2">
          <div className="flex flex-1 flex-col gap-y-3">
            <div>
              <h3 className="font-semibold uppercase">Height</h3>
              <p className="font-extralight uppercase">{pokeDetail.height}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Weight</h3>
              <p className="font-extralight uppercase">{pokeDetail.weight}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Egg Groups</h3>
              <p className="font-extralight uppercase">
                {pokeSpecies.egg_groups.map((e) => e.name)}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-y-3">
            <div>
              <h3 className="font-semibold uppercase">Habitat</h3>
              <p className="font-extralight uppercase">
                {pokeSpecies.habitat.name}
              </p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Abilities</h3>
              <p className="font-extralight uppercase">
                {
                  pokeDetail.abilities.find((e) => e.is_hidden === false)
                    ?.ability.name
                }
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          {pokeDetail.stats.map((stat) => (
            <div
              key={stat.stat.name}
              className="flex items-center justify-end gap-x-4"
            >
              <p className="uppercase">
                {stat.stat.name === "special-attack"
                  ? "SA"
                  : stat.stat.name === "special-defense"
                    ? "SD"
                    : stat.stat.name}
              </p>
              <Progress value={stat.base_stat} className="h-[10px]" />
              <p>{stat.base_stat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
