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
    { name: "Proshow", href: "#proshow" }, // In-page
    { name: "autoexpo", href: "#autoshow" },
    { name: "Echo", href: "/echo" },
  ];

  const handleLinkClick = (href, e) => {
    e.preventDefault();
    console.log(`Navigating to ${href}`);

    if (menuOpen) setMenuOpen(false);

    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
        router.push(href);
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 w-full flex items-center justify-between px-6 md:px-12 z-[1000] transition-all duration-500 ${
        scrolled ? "h-16 backdrop-blur-lg bg-black/50" : "h-20"
      }`}
    >
      <div className="h-[1px] w-1/4 bg-gradient-to-r from-transparent via-red-500 to-transparent hidden md:block animate-pulse" />

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center justify-between w-full">
        {/* Left links */}
        <div className="flex items-center space-x-8">
          {navLinks.slice(0, 3).map((link, index) => (
            <a 
              key={index}
              ref={(el) => {
                if (el) linksRef.current[index] = el;
              }}
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
        </div>

        {/* Logo center */}
        <div className="relative hover:opacity-80 transition-all">
          <a 
            href="/"
            className="block relative z-10"
            onClick={(e) => handleLinkClick("/", e)}
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

        {/* Right links + register */}
        <div className="flex items-center space-x-8">
          {navLinks.slice(3).map((link, index) => (
            <a 
              key={index + 3}
              ref={(el) => {
                if (el) linksRef.current[index + 3] = el;
              }}
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

          <a
              href="https://vidyut.ulsav.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/30 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-full text-white text-sm hover:bg-black/50 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer inline-block text-center"
          >
            <span className="text-red-400">REGISTER</span>
          </a>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none p-2 cursor-pointer"
        >
          <div className="relative w-6 h-5">
            <span className={`absolute h-0.5 w-full bg-red-400 transform transition-all duration-300 ${menuOpen ? 'rotate-45 top-2' : 'top-0'}`}></span>
            <span className={`absolute h-0.5 w-full bg-red-400 top-2 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute h-0.5 w-full bg-red-400 transform transition-all duration-300 ${menuOpen ? '-rotate-45 top-2' : 'top-4'}`}></span>
          </div>
        </button>
      </div>

      <div className="h-[1px] w-1/4 bg-gradient-to-l from-transparent via-red-500 to-transparent hidden md:block animate-pulse" />

      {/* Mobile menu content */}
      <div 
        className={`absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg transform ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } transition-all duration-500 z-50`}
      >
        <div className="flex flex-col space-y-4 p-6">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href}
              onClick={(e) => handleLinkClick(link.href, e)}
              className={`text-white py-4 px-2 border-b border-red-500/20 transition-all duration-300 block cursor-pointer ${
                router.pathname === link.href 
                  ? "text-red-400 border-red-500" 
                  : "hover:border-red-500 hover:text-red-400 hover:pl-4"
              }`}
            >
              {link.name}
            </a>
          ))}
          <button 
            className="bg-gradient-to-r from-red-800/50 to-red-600/50 border border-red-500/30 px-6 py-3 rounded text-white mt-4 hover:from-red-700/70 hover:to-red-500/70 active:scale-95 transform transition-all duration-300 cursor-pointer"
            onClick={() => router.push("/register")}
          >
            REGISTER NOW
          </button>
        </div>
      </div>
    </nav>
  );
}
