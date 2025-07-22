import DynamicIsland from "@/components/dynamic-island";
import GooeyEffect from "@/components/ui/GooeyEffect";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <GooeyEffect />
      <div className="wrapper">
        <DynamicIsland />
      </div>
    </main>
  );
}
