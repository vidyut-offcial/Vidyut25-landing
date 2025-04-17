import { useState, useEffect } from "react";
import Card from "./Card";

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    {
      id: 1,
      title: "Innovative Vehicle Design Workshop",
      description:
        "Explore next-gen vehicle design with Mahindra-Campervan. Learn about modular architecture, off-road adaptability, and sustainable mobility in this expert-led session.",
    },
    {
      id: 2,
      title: "Inside NVIDIA : The Isaac SIM & Omniverse Workshop",
      description:
        "Dive into robotics with NVIDIA Isaac Sim, ROS, and Jetson. Discover how these tools power simulations, real-time AI, and robotic innovation.",
    },
    {
      id: 3,
      title: "Qubits Unleashed: Quantum Computing Workshop",
      description:
        "Step into the quantum world! Learn qubits, superposition, gates, and build circuits. Perfect for tech lovers curious about quantum’s future impact.",
    },
    {
      id: 4,
      title: "Game On! Unity Development Workshop by Studd Games",
      description:
        "Create games with Unity! Learn design, scripting, and game physics, guided by industry experts. Ideal for aspiring developers and gamers.",
    },
    {
      id: 5,
      title: "CaptureTheFlag: Vidyut Edition",
      description:
        "Test your ethical hacking skills in Vidyut's exclusive CTF. Dive into cryptography, network security, and cyber challenges.",
    },
    {
      id: 6,
      title: "TechTurf RoboSoccer National Competition",
      description:
        "Design, build, and compete in RoboSoccer! A national robotics showdown blending strategy, engineering, and teamwork.",
    },
    {
      id: 7,
      title: "War of the Bots",
      description:
        "Enter a high-intensity robot combat arena! Build your bot and battle for glory in this ultimate test of engineering and tactics.",
    },
    {
      id: 8,
      title: "Drone Racing",
      description:
        "Race through thrilling aerial tracks! Test your speed, agility, and reflexes in this high-octane drone competition.",
    },
  ];  

  const radius = 500;
  const rotateStep = 360 / cards.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div
        className="relative w-[300px] h-[400px] preserve-3d"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="absolute w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius}px) rotateY(-${
              activeIndex * rotateStep
            }deg)`,
          }}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="absolute left-0 top-0 w-full h-full"
              style={{
                transform: `rotateY(${i * rotateStep}deg) translateZ(${radius}px)`,
              }}
            >
              <Card title={card.title} description={card.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
