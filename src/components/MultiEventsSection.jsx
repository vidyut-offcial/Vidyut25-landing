'use client';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { a } from "@react-spring/three";
import BgVideoSection from "./BgVideoSection";
import { CardDemo } from "./ui/demo_card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Code2, ShieldCheck, Users, Trophy, Mic } from "lucide-react";
import { GlareCard } from "@/components/ui/glare-card";
import { cn } from "@/lib/utils";
const FullCard = ({
  title,
  description,
  imageUrl,
  ctaLink,
  ctaText,
  buttonText,
}) => {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border"
      >
        <img
          src="/images/stars-gif.webp"
          alt="stars"
          className="absolute h-full w-full bg-cover object-cover z-0 top-0 left-0"
        />
        <CardItem
          translateZ="50"
          className="text-3xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={imageUrl}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="span"
            href={ctaLink}
            target="__blank"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-lg font-bold"
          >
            {buttonText}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default function MultiEventsSection({ onSectionChange }) {
  const cards = [
    {
      title: "Pro Show",
      description: "Description",
      imageUrl:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ctaLink: "/proshow",
      ctaText: "View now",
      buttonText: "View Pro Show",
    },
    {
      title: "Events",
      description: "Description",
      imageUrl: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
      ctaLink: "/events",
      ctaText: "View Now",
      buttonText: "View Events",
    },
    {
      title: "Car Show",
      description: "Description",
      imageUrl: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
      ctaLink: "/carshow",
      ctaText: "View",
      buttonText: "View Car Show",
    },
  ];

  return (
    <section
      id="multi-events-section"
      className="h-screen w-full select-none bg-black relative flex  items-center justify-center overflow-hidden"
    >
      {/* <BgVideoSection videoSrc={"/videos/asteroid-planet.webm"} nextSectionId={"past-section"} /> */}
      {/* <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
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
      </ul> */}
      
      <div className="flex flex-col-1  items-center justify-center gap-10 md:grid-cols-2 lg:grid-cols-3 ">
   <CardDemo
  title="Mainstage Madness"
  description="Electrifying performances and unforgettable nights."
/>
<CardDemo
  title="Mainstage Madness"
  description="Electrifying performances and unforgettable nights."
/>
<CardDemo
  title="Mainstage Madness"
  description="Electrifying performances and unforgettable nights."
/>
</div>
    </section>
  );
}
{/* const GridItem = ({
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
}; */}
//       {cards.map((card, index) => (
//         <a 
//           key={index}
//           href={card.ctaLink}
//           target="__blank"
//         >
//           <FullCard {...card} />
//         </a>
//       ))}
//     </section>
//   );
// }
