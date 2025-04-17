"use client";

import AboutSection from "@/components/AboutSection";
import CarShowSection from "@/components/CarShowSection";
import EventsSection from "@/components/EventsSection";
import HeroSection from "@/components/HeroSection";
import IdeaSection from "@/components/IdeaSection";
import NavBar from "@/components/NavBar";
import { PastSection } from "@/components/PastSection";
import PostLoading from "@/components/PostLoading";
import ProShowSection from "@/components/ProShowSection";
import WorkshopSection from "@/components/WorkshopSection";
import SpaceShipModel from "@/models/SpaceShipModel";

const products = [
  {title: "2024", thumbnail: "/images/thumbnail.avif", link: "/2024"},
  {title: "2023", thumbnail: "/images/thumbnail.avif", link: "/2024"},
  {title: "2022", thumbnail: "/images/thumbnail.avif", link: "/2024"},
  {title: "2021", thumbnail: "/images/thumbnail.avif", link: "/2024"},
]

export default function Home() {
  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
      <NavBar />
      <div className="fixed top-0 left-0 z-0">
        <SpaceShipModel stars={true} />
      </div>
      <PostLoading />
      {/* <HeroSection />
      <IdeaSection />
      <AboutSection />
      <PastSection products={products} />
      <EventsSection />
      <WorkshopSection />
      <ProShowSection />
      <CarShowSection /> */}
    </main>
  );
}
