"use client";

import { useRef, useEffect, useState } from "react";
import Carousel from "./Carousel";

export default function WorkshopSection() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="h-screen overflow-x-hidden flex items-center justify-center w-full select-none relative -translate-y-full">
      <div 
        className="flex flex-col items-center justify-evenly h-screen w-full relative"
      >
        <div className=" flex flex-col items-center justify-center">
          <p className="text-center text-8xl text-foreground font-frontage-bold px-48 xs:px-22">
            Vidyut
          </p>     
          <p className="text-center text-5xl border-foreground border-b pb-8 text-foreground font-frontage-bold px-48 xs:px-22">
            Workshops
          </p>
        </div>

        <div className="flex flex-col items-center z-50 justify-center relative">
          <Carousel />
        </div>
      </div>
    </section>
  );
}
