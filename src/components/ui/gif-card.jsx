"use client";
import { cn } from "@/lib/utils";

export function GIFCard({ title, description, bg, gif }) {
  return (
      <div
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-150 shadow-xl mx-auto flex flex-col justify-end p-4 rounded-xl border-transparent dark:border-neutral-800",
          "transition-all duration-500"
        )}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundImage = `url(${gif})`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundImage = `url(${bg})`;
        }}
      >
        <div className="text relative z-50">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
            {title}
          </h1>
          <p className="font-normal text-base text-gray-50 relative my-4">
            {description}
          </p>
        </div>
      </div>
  );
}