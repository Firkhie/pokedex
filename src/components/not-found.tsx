import { Info } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-x-2 text-white">
      <Info className="h-6 w-6 md:h-10 md:w-10" />
      <p className="text-base font-semibold md:text-2xl">Not Found</p>
    </div>
  );
}
