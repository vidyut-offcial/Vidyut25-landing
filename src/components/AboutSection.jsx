"use client";

import Image from "next/image";
import Logo from "../../public/images/logo.svg"
import { useEffect, useState } from "react";

export default function AboutSection() {
  return (
    <main className="h-screen w-screen relative flex items-center gap-20 py-36 justify-center">
      <div className="flex items-center rounded-3xl h-1/2 w-1/4 border border-dashed border-foreground justify-center relative">
        <Image 
          className="h-full w-full p-8"
          src={Logo}
          alt="Vidyut Logo"
        />
      </div>

      <div className="relative z-50 md:row-span-2 w-[60%] flex items-center justify-center">
        <p className="text-center text-4xl text-foreground font-frontage-bold px-48 xs:px-22">
          Vidyut, a national multi-fest by Amrita Vishwa Vidyapeetham, fosters creativity with its 2025 theme, Echos of the future
        </p>
      </div>
    </main>
  );
}
