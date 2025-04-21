"use client";
import { Code2, ShieldCheck, Users, Trophy, Mic } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import BgVideoSection from "./BgVideoSection";

export default function PastSection({ onSectionChange }) {
  return (
    <section
      id="past-section"
      className="min-h-screen w-screen relative flex flex-col items-center gap-20 justify-center p-18 pointer-events-none"
    >
      <BgVideoSection 
        videoSrc={"/videos/asteroid-dust.webm"} 
        nextSectionId={"faq-section"}
        sectionIndex={8}
        onSectionChange={onSectionChange}   
      />
      <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<Code2 className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Hackathon Showdown"
          description="24-hour development marathon where techies built solutions overnight and pitched to industry experts." />
        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={<ShieldCheck className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="CTF Championship"
          description="Teambi0s hosted one of India's most challenging Capture The Flag hacking contests." />
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Users className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Workshops Galore"
          description="Interactive sessions on AI, Blockchain, Cybersecurity, and Drone Tech packed the halls." />
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<Trophy className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Tech & Talent Competitions"
          description="From coding duels to design battles, students showcased brilliance in multiple domains." />
        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={<Mic className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Pro Shows & Celeb Nights"
          description="The evenings lit up with live performances by top artists and energetic crowd moments." />
      </ul>
    </section>
  );
}

const GridItem = ({
  area,
  icon,
  title,
  description
}) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl bg-[rgba(0,0,0,0.65)] border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01} />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
