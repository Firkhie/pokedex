import Image from "next/image";
import { Pokemon, PokemonSpecies } from "pokenode-ts";
import { Progress } from "@/components/ui/progress";

interface DescriptionDefaultProps {
  pokeDetail: Pokemon;
  pokeSpecies: PokemonSpecies;
}

export default function DescriptionDefault({
  pokeDetail,
  pokeSpecies,
}: DescriptionDefaultProps) {
  return (
    <div className="relative hidden md:flex h-full w-full gap-x-10 overflow-auto scrollbar-hide">
      {/* Left */}
      <div className="flex h-full flex-1 flex-col justify-between text-white">
        <div className="relative flex w-fit flex-col gap-y-3 rounded-md bg-neutral-400 bg-opacity-40 p-5 pr-24">
          <div className="absolute left-0 top-0 h-full w-1 rounded-md bg-white"></div>
          <div className="flex items-end gap-x-1">
            <h3 className="text-2xl font-bold uppercase">{pokeDetail.name}</h3>
            <p className="text-lg font-semibold">#{pokeDetail.id}</p>
          </div>
          <div className="flex gap-x-6">
            {pokeDetail.types.map((item) => (
              <div
                key={item.type.name}
                className="flex flex-col items-center gap-y-2"
              >
                <div className="relative h-[50px] w-[50px]">
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
        <div className="relative hidden max-w-[400px] flex-col gap-y-1 rounded-md bg-neutral-400 bg-opacity-40 p-5 md:flex">
          <div className="absolute left-0 top-0 h-full w-1 rounded-md bg-white"></div>
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
              <Progress
                value={stat.base_stat}
                className="h-[10px] max-w-[250px]"
              />
              <p>{stat.base_stat}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Middle */}
      <div className="absolute left-1/2 top-1/2 -z-50 flex h-full flex-1 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
        <div className="flex h-[380px] w-[380px] items-center justify-center rounded-full border-4 border-dashed border-white p-5">
          <div className="flex h-[320px] w-[320px] items-center justify-center rounded-full border-4 border-white p-5">
            <div className="relative h-[250px] w-[250px]">
              <Image
                alt="pokemon"
                src={
                  pokeDetail.sprites.other?.["official-artwork"].front_default!
                }
                fill
              />
            </div>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex h-full flex-1 flex-col items-end justify-between text-white">
        <div className="relative hidden max-w-[420px] flex-col gap-y-1 rounded-md bg-neutral-400 bg-opacity-40 p-5 md:flex">
          <div className="absolute right-0 top-0 h-full w-1 rounded-md bg-white"></div>
          <div className="flex h-full w-full gap-x-16">
            <div className="flex w-full flex-col gap-y-3">
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
            <div className="flex w-full flex-col gap-y-3">
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
        </div>
        <div className="relative hidden max-w-[420px] flex-col gap-y-1 rounded-md bg-neutral-400 bg-opacity-40 p-5 md:flex">
          <div className="absolute right-0 top-0 h-full w-1 rounded-md bg-white"></div>
          <h3 className="text-2xl font-bold uppercase">Description</h3>
          <p className="font-light">
            {
              pokeSpecies.flavor_text_entries.find(
                (e) => e.language.name === "en",
              )?.flavor_text
            }
          </p>
        </div>
      </div>
    </div>
  );
}
