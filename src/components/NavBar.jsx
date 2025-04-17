import Image from "next/image";
import Logo from "../../public/images/logo.svg"

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full h-16 flex justify-evenly mix-blend-difference items-center px-[10%] z-[100]">
      <div className="h-[1px] w-full bg-blue-neon" />
      <Image
        className="w-10 sm:w-14 md:w-auto h-full p-2 object-contain mix-blend-difference"
        src={Logo}
        alt="Vityut Logo"
      />
      <div className="h-[1px] w-full bg-blue-neon" />
    </nav>
  );
}