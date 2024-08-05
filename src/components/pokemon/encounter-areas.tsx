import { Info, MapPinned } from "lucide-react";
import { LocationAreaEncounter } from "pokenode-ts";
import Loader from "../loader";
import NotFound from "../not-found";

interface EncounterAreasProps {
  pokeEncAreas: LocationAreaEncounter[];
  isLoading: boolean;
}

export default function EncounterAreas({
  pokeEncAreas,
  isLoading,
}: EncounterAreasProps) {
  return (
    <div className="h-[80vh] w-full overflow-hidden p-5">
      {isLoading ? (
        <Loader />
      ) : pokeEncAreas.length > 0 ? (
        <div className="grid h-full w-full grid-cols-1 gap-5 overflow-auto scrollbar-hide sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {pokeEncAreas.map((area) => (
            <div
              key={area.location_area.name}
              className="flex h-[150px] flex-col items-center justify-center gap-y-3 rounded-md bg-neutral-500 bg-opacity-40 px-6 py-4 text-white"
            >
              <MapPinned className="h-8 w-8 md:h-10 md:w-10" />
              <p className="text-center text-sm uppercase md:text-base lg:text-lg">
                {area.location_area.name.replaceAll("-", " ")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
