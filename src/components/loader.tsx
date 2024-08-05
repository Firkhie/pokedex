import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle className="h-56 w-56 animate-spin text-neutral-400 text-opacity-75" />
    </div>
  );
}
