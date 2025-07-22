import DynamicIsland from "@/components/dynamic-island";
import GooeyEffect from "@/components/ui/GooeyEffect";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <GooeyEffect />
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 z-10 shadow-sm ring-1 ring-inset ring-gray-300/50 shadow-inset-border rounded-xl" />
        <div className="wrapper">
          <DynamicIsland />
        </div>
      </div>
    </main>
  );
}
