import { Construction } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div className="h-[80vh] w-full overflow-hidden p-5">
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-3 text-white">
        <Construction className="h-[150px] w-[150px]" />
        <h2 className="text-2xl font-bold uppercase tracking-wider">
          Under Development
        </h2>
      </div>
    </div>
  );
}
