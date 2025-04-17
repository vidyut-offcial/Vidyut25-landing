import SpaceShipModel from "@/models/SpaceShipModel";

export default function HeroSection() {
  return (
    <main className="h-screen w-screen relative">
      <div className="absolute top-0 left-0">
        <SpaceShipModel />
      </div>
    </main>
  );
}
