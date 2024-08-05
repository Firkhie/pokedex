import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Move } from "pokenode-ts";
import Loader from "../loader";
import NotFound from "../not-found";

interface MovesProps {
  pokeMoves: Move[];
  isLoading: boolean;
}

export default function Moves({ pokeMoves, isLoading }: MovesProps) {
  return (
    <div className="h-[80vh] w-full overflow-hidden">
      {isLoading ? (
        <Loader />
      ) : pokeMoves.length > 0 ? (
        <div className="h-full w-full overflow-auto scrollbar-hide">
          <Table>
            <TableHeader className="bg-neutral-500 bg-opacity-20">
              <TableRow className="text-sm font-semibold md:text-base lg:text-lg">
                <TableHead className="text-center text-neutral-400">
                  Move
                </TableHead>
                <TableHead className="hidden text-center text-neutral-400 lg:table-cell">
                  Damage Class
                </TableHead>
                <TableHead className="text-center text-neutral-400">
                  Power
                </TableHead>
                <TableHead className="hidden text-center text-neutral-400 md:table-cell">
                  Accuracy
                </TableHead>
                <TableHead className="text-center text-neutral-400">
                  Type
                </TableHead>
                <TableHead className="hidden text-center text-neutral-400 sm:table-cell">
                  PP
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pokeMoves.map((move) => (
                <TableRow
                  key={move.id}
                  className="text text-center text-sm uppercase text-white md:text-base lg:text-lg"
                >
                  <TableCell>{move.name}</TableCell>
                  <TableCell className="hidden items-center justify-center lg:flex">
                    <div className="relative h-8 w-8">
                      <Image
                        alt={move.type.name}
                        src={`/moves/${move.damage_class?.name}.png`}
                        fill
                      />
                    </div>
                  </TableCell>
                  <TableCell>{move.power}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {move.accuracy}
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <div className="relative h-8 w-8">
                      <Image
                        alt={move.type.name}
                        src={`/types/${move.type.name}.png`}
                        fill
                      />
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {move.pp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
