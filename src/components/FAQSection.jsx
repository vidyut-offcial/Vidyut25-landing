"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SendHorizontal, ChevronDown } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../public/images/logo.svg";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { question: "What is VIDYUT?", answer: "VIDYUT is India's largest national-level inter-collegiate Multifest. It is a Three - Day event hosted at Amrita Vishwa Vidyapeetham, Amritapuri Campus, offering a wide range of workshops, competitions and cultural events" },
  { question: "When is VIDYUT?", answer: "VIDYUT '25 is set to take place on May 23, 24 & 25, 2025" },
  { question: "Where is VIDYUT '25 held?", answer: "VIDYUT will be held at Amrita Vishwa Vidyapeetham, Amritapuri, Clappana PO, Kollam" },
  { question: "Question 4?", answer: "Answer for this question." },
];

export default function FAQSection() {
  const [userPrompt, setUserPrompt] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const router = useRouter();

  const faqRefs = useRef(
    faqs.map(() => ({
      questionEl: null,
      contentEl: null,
      chevronEl: null,
      containerEl: null,
      questionContainerEl: null
    }))
  );

  useEffect(() => {
    faqRefs.current.forEach((ref, idx) => {
      if (ref.questionContainerEl) {
        if (idx === openFaqIndex) {
          ref.questionContainerEl.classList.remove("h-full");
          ref.questionEl.classList.remove("text-2xl", "xs:text-3xl", "sm:text-4xl", "md:text-5xl", "lg:text-6xl", "text-center");
          ref.questionEl.classList.add("text-lg", "xs:text-xl", "sm:text-2xl", "md:text-3xl", "lg:text-4xl", "text-left");
        } else {
          ref.questionContainerEl.classList.add("h-full");
          ref.questionEl.classList.add("text-2xl", "xs:text-3xl", "sm:text-4xl", "md:text-5xl", "lg:text-6xl", "text-center");
        }
      }
      
      if (ref.contentEl) {
        if (idx === openFaqIndex) {
          ref.contentEl.style.height = "auto";
          ref.contentEl.style.opacity = 1;
          ref.contentEl.style.visibility = "visible";
        } else {
          ref.contentEl.style.height = "0px";
          ref.contentEl.style.opacity = 0;
          ref.contentEl.style.visibility = "hidden";
        }
      }
      
      if (ref.chevronEl) {
        if (idx === openFaqIndex) {
          ref.chevronEl.style.opacity = 1;
          ref.chevronEl.style.transform = "rotate(180deg)";
        }
      }
    });
  }, [openFaqIndex]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(/Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768);
    }

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    }
  }, [isMobile]);

  useGSAP(() => {
    const boxes = gsap.utils.selector(sectionRef)(".box");
  
    const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
  
    if (!isMobile) {
      boxes.forEach((el) => {
        const textElements = el.querySelectorAll("p, svg, span, input, a, h2, h3, h4, h5, h6");
  
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
    }
  
    // Entry animation for FAQ cards (left column)
    gsap.fromTo(
      faqRefs.current.map(ref => ref.containerEl),
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      }
    );
  
    // Entry animation for right side boxes
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".md\\:col-start-2 .box"),
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.2,
      }
    );
  }, []);  

  const toggleFaq = (index) => {
    if (index === openFaqIndex) return;
    
    if (openFaqIndex !== null) {
      const currentRef = faqRefs.current[openFaqIndex];
      
      if (currentRef.questionContainerEl) {
        gsap.to(currentRef.questionContainerEl, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            currentRef.questionContainerEl.classList.add("h-full");
            currentRef.questionEl.classList.add("text-2xl", "xs:text-3xl", "sm:text-4xl", "md:text-5xl", "lg:text-6xl", "text-center");
            currentRef.questionEl.classList.remove("text-lg", "xs:text-xl", "sm:text-2xl", "md:text-3xl", "lg:text-4xl", "text-left");
          }
        });
      }
      
      if (currentRef.contentEl) {
        gsap.to(currentRef.contentEl, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            currentRef.contentEl.style.visibility = "hidden";
          }
        });
      }
      
      if (currentRef.chevronEl) {
        gsap.to(currentRef.chevronEl, {
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    }
    
    const selectedRef = faqRefs.current[index];
    
    if (selectedRef.questionContainerEl) {
      selectedRef.questionContainerEl.classList.remove("h-full");
      selectedRef.questionEl.classList.remove("text-2xl", "xs:text-3xl", "sm:text-4xl", "md:text-5xl", "lg:text-6xl", "text-center");
      selectedRef.questionEl.classList.add("text-lg", "xs:text-xl", "sm:text-2xl", "md:text-3xl", "lg:text-4xl", "text-left");
    }
    
    if (selectedRef.contentEl) {
      const contentHeight = selectedRef.contentEl.scrollHeight;
      selectedRef.contentEl.style.visibility = "visible";
      
      gsap.to(selectedRef.contentEl, {
        height: contentHeight,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
    
    if (selectedRef.chevronEl) {
      gsap.to(selectedRef.chevronEl, {
        rotation: 180,
        duration: 0.4,
        ease: "power2.out"
      });
    }
    
    setOpenFaqIndex(index);
  };

  const handleFaqHover = (index) => {
    if (index !== openFaqIndex) {
      const ref = faqRefs.current[index];
      if (ref.chevronEl) {
        gsap.to(ref.chevronEl, {
          y: [0, -5, 0],
          duration: 0.6,
          ease: "power1.inOut"
        });
      }
    }
  };

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
      className="min-h-screen overflow-x-hidden w-full bg-transparent relative select-none"
    >
      <div
        className="grid h-full w-full relative border-border border-b grid-cols-1 grid-rows-[100vh_100vh] md:grid-rows-[100vh] md:grid-cols-[50%_50%] gap-0"
      >
        <div className="col-start-1 flex flex-col h-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={el => (faqRefs.current[index].containerEl = el)}
              className="border-border border-r border-t px-8 py-4 box cursor-pointer flex-1 flex flex-col overflow-hidden relative"
              onClick={() => toggleFaq(index)}
              onMouseEnter={() => handleFaqHover(index)}
            >
              <div 
                ref={el => (faqRefs.current[index].questionContainerEl = el)}
                className="flex justify-between items-center"
              >
                <h3 
                  ref={el => (faqRefs.current[index].questionEl = el)}
                  className="font-proxima transition-all duration-300"
                >
                  {faq.question}
                </h3>
                <ChevronDown 
                  ref={el => (faqRefs.current[index].chevronEl = el)} 
                  className="transition-all duration-300 ml-2" 
                  size={24} 
                />
              </div>
              <div 
                ref={el => (faqRefs.current[index].contentEl = el)}
                className="overflow-hidden transition-all duration-300"
              >
                <p className="text-xs xs:text-lg sm:text-xl md:text-2xl lg:text-2xl text-text-secondary font-proxima border-stroke border-t pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-start-2 flex flex-col h-full">
          <div className="row-span-2 relative z-50 border-border border-r border-t px-8 py-6 flex items-center justify-center box h-1/3">
            <Image 
              src={Logo}
              alt="Vidyut Logo"
              className="h-32 w-32 mix-blend-difference"
              priority
            />
          </div>
          <div className="relative z-50 border-border border-r border-t px-8 py-6 flex flex-col justify-center gap-2 box h-1/3">
            <h3 className="text-4xl font-bold font-sf">Ask Echo</h3>
            <form onSubmit={handlePromptSubmit} className="flex items-center border border-border mt-2">
              <input
                type="text"
                placeholder="Got something we didn't answer?"
                className="bg-transparent p-2 flex-grow h-12 text-xl px-4 focus:outline-none text-muted-foreground"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
              />
              <button 
                type="submit" 
                className="p-2 w-16 flex items-center justify-center border-border border-l h-full transition hover:bg-foreground hover:text-background"
              >
                <SendHorizontal size={20} />
              </button>
            </form>
          </div>
          <div className="relative z-50 border-border border-r border-t flex flex-col justify-between box h-1/3">
            <h3 className="h-2/3 w-full flex items-center justify-start pl-8 text-4xl font-bold font-sf">Reach out</h3>
            <div className="grid grid-cols-4 h-1/3 w-full text-sm text-muted-foreground">
              <a className="text-sm font-semibold font-frontage-bulb flex items-center justify-center border-border border-t border-r" target="_blank" href="https://www.instagram.com/vidyutmultifest">{!isMobile ? "Instagram" : <FaInstagram />}</a>
              <a className="text-sm font-semibold font-frontage-bulb flex items-center justify-center border-border border-t border-r" target="_blank" href="https://www.facebook.com/Vidyut.Multifest/">{!isMobile ? "Facebook" : <FaFacebook />}</a>
              <a className="text-sm font-semibold font-frontage-bulb flex items-center justify-center border-border border-t border-r" target="_blank" href="https://www.linkedin.com/company/vidyut-amrita/">{!isMobile ? "LinkedIn" : <FaLinkedin />}</a>
              <a className="text-sm font-semibold font-frontage-bulb flex items-center justify-center border-border border-t" target="_blank" href="mailto:vidyut@am.amrita.edu">{!isMobile ? "Mail" : <IoMdMail />}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}