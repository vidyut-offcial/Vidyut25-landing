import Image from "next/image";
import f1 from "../../public/images/f1.png"
import scifi from "../../public/images/scifi.png"
import moto from "../../public/images/moto.png"
import anton from "../../public/images/anton.png"

export default function EventsSection() {
  return (
    <section id="events-section" className="h-screen bg-transparent w-screen relative flex flex-col items-center gap-20 py-36 justify-center -translate-y-full">
      <div className="flex items-center justify-center border-b border-foreground pb-18 h-1/2">
        <Image
          className="w-sm"
          src={moto}
          alt="Moto Flag"
        />
        <div className="flex flex-col justify-end items-end">
          <h2 className="text-8xl font-proxima font-bold italic text-red-600">Flagship</h2>
          <p className="text-5xl font-proxima font-bold italic text-foreground">Events</p>
        </div>
      </div>

      <div className="flex gap-6 h-1/2 items-center justify-center">
        <Image
          src={scifi}
          alt="Scifi Women"
          className="rounded-3xl w-fit h-[90%]"
        />
        <Image
          src={anton}
          alt="Anton"
          className="rounded-3xl w-fit h-[90%]"
        />
        <Image
          src={f1}
          alt="F1 Car"
          className="rounded-3xl w-fit h-[90%]"
        />
      </div>
    </section>
  );
}
