import Image from "next/image";
import singerGroup from "../../public/images/singer-group.png" 
import singer1 from "../../public/images/singer-1.png"
import singer2 from "../../public/images/singer-2.png"
import singer3 from "../../public/images/singer-3.png"
import singer4 from "../../public/images/singer-4.png"
import singer5 from "../../public/images/singer-5.png"

export default function ProShowSection() {
  return (
    <section id="proshow-section" className="h-screen overflow-x-hidden flex items-center justify-center w-full select-none relative -translate-y-full">
      <div 
        className="flex flex-col items-center justify-evenly h-screen w-full relative"
      >
        <div className=" flex flex-col items-center justify-center">
          <p className="text-center text-8xl text-foreground font-frontage-bold px-48 xs:px-22">
            Vidyut
          </p>     
          <p className="text-center text-5xl border-foreground border-b pb-8 text-foreground font-frontage-bold px-48 xs:px-22">
            ProShows
          </p>
        </div>

        <div className="flex h-1/2 gap-0 relative">
          <Image
            className="h-[90%] w-fit"
            src={singerGroup}
            alt="Singer"
          />
          {/* <Image
            className="h-[90%] w-fit"
            src={singer1}
            alt="Singer"
          />
          <Image
            className="h-[90%] w-fit"
            src={singer2}
            alt="Singer"
          />
          <Image
            className="h-[90%] w-fit"
            src={singer3}
            alt="Singer"
          />
          <Image
            className="h-[90%] w-fit"
            src={singer4}
            alt="Singer"
          />
          <Image
            className="h-[90%] w-fit"
            src={singer5}
            alt="Singer"
          /> */}
        </div>
      </div>
    </section>
  );
}