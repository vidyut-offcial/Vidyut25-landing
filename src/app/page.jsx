"use client";

import HeroSection from "@/components/HeroSection";
import PostLoading from "@/components/PostLoading";

export default function Home() {
  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
      <PostLoading />
      {/* <HeroSection /> */}
    </main>
  );
}
