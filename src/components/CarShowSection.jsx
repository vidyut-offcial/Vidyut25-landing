import carCenter from "../../public/images/center-car.png"
import carRight from "../../public/images/gtr-right.png"
import carLeft from "../../public/images/car-left.png"
import transparentCar from "../../public/images/gtr.png"
import carBG from "../../public/images/car-bg.png"
import Image from "next/image"

export default function CarShowSection() {
  return (
    <section id="carshow-section" className="h-screen w-full relative bg-transparent overflow-hidden">
      {/* Background with car schematic overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full relative">
          <Image 
            src={carBG} 
            alt="Car Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      
      {/* Main content container */}
      <div className="flex flex-col items-center justify-center h-full py-8 relative z-10 max-w-7xl mx-auto">
        {/* Top car gallery section */}
        <div className="grid grid-cols-3 gap-2 w-full px-4">
          {/* Left car */}
          <div className="relative h-40 md:h-56 bg-black/40">
            <Image 
              src={carLeft} 
              alt="Sports Car"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Center car with red stripe */}
          <div className="relative h-40 md:h-56 bg-gray-900">
            <div className="absolute h-full w-0.5 bg-red-600 left-1/2 transform -translate-x-1/2 z-20"></div>
            <Image 
              src={carCenter} 
              alt="Red Sports Car"
              fill
              className="object-cover z-10"
            />
          </div>
          
          {/* Right car */}
          <div className="relative h-40 md:h-56 bg-black/40">
            <Image 
              src={carRight} 
              alt="GTR"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Center white car (Porsche) */}
        <div className="absolute z-[100] w-full h-full md:h-64 flex justify-center items-center my-4">
          <div className="w-[100vw] h-[100vh] relative">
            <Image
              src={transparentCar}
              alt="Porsche"
              fill
              className="object-contain h-1/2 w-1/2"
              priority
            />
          </div>
        </div>
        
        {/* Auto Show Title Section */}
        <div className="relative z-50">
          <div className="bg-red-600 translate-y-full py-18 px-8 text-center">
            <p className="text-white text-sm uppercase font-bold tracking-wider">VIDYUT</p>
            <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-widest my-1">AUTOSHOW</h1>
            <div className="mt-2">
              <button className="bg-transparent text-white border border-white text-sm py-1 px-6 hover:bg-white hover:text-red-600 transition-colors">
                Register Now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}