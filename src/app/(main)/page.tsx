"use client";

import Image from "next/image";
import Link from "next/link";

export default function MainPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-10">
      <Link href="/pokemon">
        <div className="relative h-36 w-36 md:h-52 md:w-52">
          <Image alt="logo" src="/logo.png" fill className="object-cover" />
        </div>
      </Link>
      <h2 className="text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
        Welcome to PokeDex
      </h2>
    </div>
  );
}
