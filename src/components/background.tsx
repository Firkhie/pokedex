import Image from "next/image";

export default function Background() {
  const randomizer = (max: number) => {
    return Math.ceil(Math.random() * max);
  };
  return (
    <div className="absolute left-0 top-0 -z-10 h-full w-full">
      <Image
        alt="background"
        src={`/backgrounds/${randomizer(9)}.jpg`}
        fill
        className="object-cover"
      />
    </div>
  );
}
