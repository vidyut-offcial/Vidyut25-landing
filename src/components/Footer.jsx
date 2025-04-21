"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import logo from "../../public/images/logo.svg";
import Link from "next/link";

export default function Footer() {
  const sectionRef = useRef(null);
  
  useGSAP(() => {
    const boxes = gsap.utils.selector(sectionRef);
  
    boxes(".box").forEach((el) => {
      const textElements = el.querySelectorAll("p, svg, span, input, a, h1, img, h2, h3");
      const underlinedElements = el.querySelectorAll("a.underline span, span.underline");
    
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { backgroundColor: "var(--color-hover)", duration: 0.4, ease: "power2.out" });
        gsap.to(textElements, {
          color: "var(--color-background)",
          stroke: "var(--color-background)",
          duration: 0.4,
          ease: "power2.out",
        });
        
        if (underlinedElements.length > 0) {
          gsap.to(underlinedElements, {
            textDecoration: "underline var(--color-background)",
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
    
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { backgroundColor: "transparent", duration: 0.4, ease: "power2.out" });
        gsap.to(textElements, {
          color: "var(--color-foreground)",
          stroke: "var(--color-foreground)",
          duration: 0.4,
          ease: "power2.out",
        });
        
        if (underlinedElements.length > 0) {
          gsap.to(underlinedElements, {
            textDecoration: "underline var(--color-foreground)",
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
    });    
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="footer-section"
      className="h-screen overflow-x-hidden w-full select-none"
    >
      <div className="h-24 md:h-36 w-full" />
      <div
        className="grid h-[calc(100%-6rem)] md:h-[calc(100%-9rem)] w-full relative"
        style={{
          gridTemplateColumns: "26% 26% 36% 12%",
        }}
      >
        <div className="row-start-1 h-full col-start-1 border-border border-r border-t border-b flex flex-col justify-between">
          <div className="logo-container w-full h-[14%] flex items-center justify-center border-border box border-b">
            <h1 className="text-4xl md:text-5xl font-proxima">VIDYUT</h1>
          </div>
          
          <div className="logo-image box h-full w-full flex items-center justify-center">
            <Image
              alt="Logo"
              src={logo}
              className="mix-blend-difference h-48 w-48"
            />
          </div>
          
          <div className="copyright h-[10%] flex items-center border-border border-t justify-center text-center flex-col text-lg box">
            <p>&copy; 20xx - 2025. Vidyut</p>
            <p>All Rights Reserved.</p>
          </div>
        </div>
        
        <div className="row-start-1 col-start-2 h-full w-full border-border border-r border-t flex flex-col">

          <div className="h-[30%] w-full flex flex-col">
            <div className="register-link h-1/2 border-border px-8 pb-2 border-t w-full flex items-end justify-between box require-pointer">
              <span className="text-4xl text-left font-proxima">Register</span>
              <ExternalLink className="text-3xl stroke-1 mb-2" />
            </div>
            <div className="tickets-link h-1/2 border-border px-8 pb-2 border-t w-full flex items-end justify-between box require-pointer">
              <span className="text-4xl text-left font-proxima">Get Tickets</span>
              <ExternalLink className="text-3xl stroke-1 mb-2" />
            </div>
          </div>
        </div>
        
        <div className="row-start-1 relative z-50 col-start-3 border-border border-r border-t flex flex-col justify-between">
          <div className="nav-links h-full w-full grid grid-cols-1 grid-row-[1fr_1fr_1fr_1fr] gap-4">
            <Link href="/echo" className="text-7xl text-center flex h-full w-full items-center justify-center font-sf font-bold underline box">
              <span>Ask Echo</span>
            </Link>
            <Link href="#events" className="text-7xl text-center flex h-full w-full items-center justify-center font-sf font-bold underline box">
              <span>Events</span>
            </Link>
            <Link href="/theme" className="text-7xl text-center flex h-full w-full items-center justify-center font-sf font-bold underline box">
              <span>Theme</span>
            </Link>
            <Link href="/recap" className="text-7xl text-center flex h-full w-full items-center justify-center font-sf font-bold underline box">
              <span>Recap</span>
            </Link>
          </div>
        </div>
        
        <div className="box col-start-4 flex w-full h-full items-center justify-center require-pointer">
          <p className="uppercase h-full w-full flex items-center justify-center -rotate-90 text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            See You Soon
          </p>
        </div>
      </div>
    </footer>
  );
}
