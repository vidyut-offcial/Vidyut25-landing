import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../../public/images/logo.svg";
import { gsap } from "gsap";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const router = useRouter();
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!logoRef.current) return;
    
    const logoAnimation = gsap.timeline({ paused: true })
      .to(logoRef.current, { 
        opacity: 0.7,
        duration: 0.4, 
        ease: "power2.out" 
      });
    
    const logoWrapper = logoRef.current.parentElement;
    
    const handleMouseEnter = () => {
      logoAnimation.play();
    };
    
    const handleMouseLeave = () => {
      logoAnimation.reverse();
    };
    
    if (logoWrapper) {
      logoWrapper.addEventListener("mouseenter", handleMouseEnter);
      logoWrapper.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        logoWrapper.removeEventListener("mouseenter", handleMouseEnter);
        logoWrapper.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [logoRef]);


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Proshow", href: "/proshow" },
    { name: "Auto Show", href: "/autoshow" },
    { name: "Echo", href: "/echo" },
  ];

  const handleLinkClick = (href, e) => {
    e.preventDefault();
    console.log(`Navigating to ${href}`);
    
    if (menuOpen) {
      setMenuOpen(false);
    }
    
    router.push(href);
  };
  const leftLinks = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3);

  return (
    <nav 
    ref={navRef}
    className={`fixed top-0 w-full flex items-center justify-between px-6 md:px-12 z-[1000] transition-all duration-500 ${
      scrolled ? "h-16 backdrop-blur-lg bg-black/50" : "h-20"
    }`}
  >
    <div className="h-[1px] w-1/4 bg-gradient-to-r from-transparent via-red-500 to-transparent hidden md:block animate-pulse" />
  
    {/* LEFT LINKS */}
    <div className="hidden md:flex items-center space-x-6">
      {leftLinks.map((link, index) => (
        <a 
          key={index}
          href={link.href}
          onClick={(e) => handleLinkClick(link.href, e)}
          className={`text-white relative group text-sm uppercase tracking-wider transition-all duration-300 py-2 px-4 cursor-pointer ${
            router.pathname === link.href 
              ? "text-red-400 font-medium" 
              : "opacity-70 hover:opacity-100 hover:text-red-400"
          }`}
        >
          {link.name}
          <span 
            className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-red-500 to-transparent transition-all duration-300 ${
              router.pathname === link.href 
                ? "w-full" 
                : "w-0 group-hover:w-full"
            }`}
          />
        </a>
      ))}
    </div>
  
    {/* LOGO CENTERED */}
    <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
      <a 
        href="/"
        onClick={(e) => handleLinkClick("/", e)}
        className="block relative z-10"
      >
        <div className="p-2">
          <Image
            ref={logoRef}
            className="w-10 sm:w-12 object-contain cursor-pointer"
            src={Logo}
            alt="Vidyut Logo"
            width={48}
            height={48}
            priority
          />
        </div>
      </a>
    </div>
  
    {/* RIGHT LINKS */}
    <div className="hidden md:flex items-center space-x-6">
      {rightLinks.map((link, index) => (
        <a 
          key={index}
          href={link.href}
          onClick={(e) => handleLinkClick(link.href, e)}
          className={`text-white relative group text-sm uppercase tracking-wider transition-all duration-300 py-2 px-3 cursor-pointer ${
            router.pathname === link.href 
              ? "text-red-400 font-medium" 
              : "opacity-70 hover:opacity-100 hover:text-red-400"
          }`}
        >
          {link.name}
          <span 
            className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-red-500 to-transparent transition-all duration-300 ${
              router.pathname === link.href 
                ? "w-full" 
                : "w-0 group-hover:w-full"
            }`}
          />
        </a>
      ))}
  
      {/* Optional register button here */}
      <button 
        className="ml-4 bg-black/30 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-full text-white text-sm hover:bg-black/50 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer"
        onClick={() => router.push("/register")}
      >
        <span className="text-red-400">REGISTER</span>
      </button>
    </div>
  
    <div className="h-[1px] w-1/4 bg-gradient-to-l from-transparent via-red-500 to-transparent hidden md:block animate-pulse" />
  </nav>
  
  );
}