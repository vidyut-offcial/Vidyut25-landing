"use client";

import { useEffect, useState } from "react";

export default function IdeaSection() {
  return (
    <main className="h-screen w-screen relative flex flex-col items-center gap-20 py-36 justify-between">
      <div className="flex items-center justify-center relative">
        <p className="text-center text-6xl text-foreground font-frontage-regular">
          Converging Ideas,
          <br />
          Creating Tomorrow.
        </p>
      </div>

      <div className="relative z-50 md:row-span-2 w-[75%] flex items-center justify-center">
        <p className="text-center text-4xl text-foreground font-frontage-bold px-48 xs:px-22">
          Vidyut, a national multi-fest by Amrita Vishwa Vidyapeetham, fosters creativity with its 2025 theme, Echos of the future
        </p>
      </div>
    </main>
  );
}
