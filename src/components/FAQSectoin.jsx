"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const faqs = [
  { question: "What is Vidyut?", answer: "Vidyut is India's largest national-level inter-collegiate Multifest. It is a Three - Day event hosted at Amrita Vishwa Vidyapeetham, Amritapuri Campus, offering a wide range of workshops, competitions and cultural events" },
  { question: "When is Vidyut?", answer: "Vidyut '25 is set to take place on May 23, 24 & 25, 2025" },
  { question: "Where is Vidyut '25 held?", answer: "Vidyut will be held at Amrita Vishwa Vidyapeetham, Amritapuri, Clappana PO, Kollam" },
  { question: "Question 4?", answer: "Answer for this question." },
];

export default function FAQSection() {
  const [userPrompt, setUserPrompt] = useState("");
  const sectionRef = useRef(null);
  const router = useRouter();

  useGSAP(() => {
    const boxes = gsap.utils.selector(sectionRef);
  
    boxes(".box").forEach((el) => {
      const textElements = el.querySelectorAll("p, svg, span, input, a, h2, h3");
    
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { backgroundColor: "var(--color-hover)", duration: 0.4, ease: "power2.out" });
        gsap.to(textElements, {
          color: "var(--color-background)",
          stroke: "var(--color-background)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { backgroundColor: "transparent", duration: 0.4, ease: "power2.out" });
        gsap.to(textElements, {
          color: "var(--color-foreground)",
          stroke: "var(--color-foreground)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });    
  }, []); 

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (userPrompt.trim()) {
      const encodedPrompt = encodeURIComponent(userPrompt);
      router.push(`/echo?prompt=${encodedPrompt}`);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="faq-section"
      className="h-screen overflow-x-hidden w-full select-none"
    >
      <div
        className="grid h-screen w-full relative border-border border-b"
        style={{
          gridTemplateColumns: "52% 36% 12%",
          gridTemplateRows: "25% 25% 25% 25%",
        }}
      >
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`row-start-${index + 1} h-full col-start-1 border-border border-r border-t px-32 py-6 flex flex-col justify-center box`}
          >
            <h3 className="text-4xl w-full flex items-center justify-start text-foreground h-1/2 font-proxima">{faq.question}</h3>
            <p className="text-lg w-full flex items-center justify-start text-text-secondary h-1/2 font-proxima border-stroke border-t pt-4">{faq.answer}</p>
          </div>
        ))}

        <div className="row-start-1 relative z-50 col-start-2 border-border border-r border-t px-8 py-6 flex items-center justify-center box">
          <h2 className="tracking-[0.2em] text-4xl font-sf uppercase">Have a question?</h2>
        </div>
        <div className="relative z-50 row-start-2 col-start-2 border-border border-r border-t px-8 py-6 flex flex-col justify-center gap-2 box">
          <h3 className="text-6xl font-bold font-sf">Ask Echo</h3>
          <form onSubmit={handlePromptSubmit} className="flex items-center border border-border mt-2">
            <input
              type="text"
              placeholder="Got something we didn't answer?"
              className="bg-transparent p-2 flex-grow h-16 text-2xl px-8 focus:outline-none text-muted-foreground"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <button 
              type="submit" 
              className="p-2 w-24 flex items-center justify-center border-border border-l h-full transition hover:bg-foreground hover:text-background"
            >
              <SendHorizontal />
            </button>
          </form>
        </div>
        <div className="box relative z-50 row-start-3 col-start-2 border-border border-r border-t flex items-center justify-center box">
          <h5 className="absolute z-40 w-24 h-24 flex items-center justify-center text-4xl font-frontage-bold tracking-widest mix-blend-difference">
            OR
          </h5>
        </div>
        <div className="row-start-4 relative z-50 h-full col-start-2 border-border border-r border-t flex flex-col justify-between box">
          <h3 className="h-[76%] w-full flex items-center justify-start pl-8 text-6xl font-bold font-sf">Reach out</h3>
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr] h-[24%] w-full text-sm text-muted-foreground">
            <a className="text-md font-semibold font-frontage-bulb flex items-center justify-center border-border border-t border-r" target="_blank" href="https://www.instagram.com/vidyutmultifest">Instagram</a>
            <a className="text-md font-semibold font-frontage-bulb flex items-center justify-center border-border border-t border-r" target="_blank" href="https://www.facebook.com/Vidyut.Multifest/">Facebook</a>
            <a className="text-md font-semibold font-frontage-bulb flex items-center justify-center border-border border-t border-r" target="_blank" href="https://www.linkedin.com/company/vidyut-amrita/">LinkedIn</a>
            <a className="text-md font-semibold font-frontage-bulb flex items-center justify-center border-border border-t" target="_blank" href="mailto:vidyut@am.amrita.edu">Mail</a>
          </div>
        </div>

        <div className="box row-span-4 col-start-3 flex w-full h-full items-center border-border justify-center require-pointer">
          <p className="uppercase h-full w-full flex items-center justify-center -rotate-90 text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            FAQ
          </p>
        </div>
      </div>
    </section>
  );
}
