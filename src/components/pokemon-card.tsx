import { GitCompareArrows, Plus } from "lucide-react";
import Image from "next/image";

interface PokemonCardProps {
  id: number;
  name: string;
  sprite: string;
  types: any[];
}

export default function PokemonCard({
  id,
  name,
  sprite,
  types,
}: PokemonCardProps) {
  return (
    <div className="flex h-[340px] min-w-[255px] flex-col items-center gap-y-3 rounded-lg bg-neutral-500 bg-opacity-40 px-4 py-3 text-white">
      <div className="flex w-full items-center justify-between">
        <Plus />
        <GitCompareArrows />
      </div>
      <p className="font-bold uppercase tracking-wider">{name}</p>
      <div className="relative h-[150px] w-[150px]">
        <Image alt={name} src={sprite} fill />
      </div>
      <div className="flex w-full items-center justify-center gap-x-5">
        {types.map((item) => (
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
            <p className="text-sm font-semibold uppercase">{item.type.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
