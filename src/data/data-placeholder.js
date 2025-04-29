// event-data.js
const domain = 'https://vidyut.ulsav.com';

const eventData = [
  {
    title: "Innovative Vehicle Design Workshop by Mahindra-Campervan",
    description: "Explore next-gen vehicle design with Mahindra-Campervan through expert insights on modular vehicle architecture, off-road adaptability, and sustainable mobility.",
    slug: "/e/innovative-vehicle-design-workshop-by-mahindra-campervan",
    image: "/images/mahindra-final.png",
    category: "Workshops Flagship"
  },
  {
    title: "Inside NVIDIA: The Isaac SIM & Omniverse Workshop by IHub",
    description: "Experience the future of robotics with NVIDIA Isaac, ROS, and Jetson—where Edge AI, smart simulations, and real-world robot intelligence come to life!",
    slug: "/e/nvidia-isaac-sim-omniverse-workshop-ihub",
    image: "/images/nvidia-final.png",
    category: "Workshops Flagship"
  },
  {
    title: "Qubits Unleashed: Quantum Computing Workshop",
    description: "Step into the quantum revolution! Explore qubits, superposition, and circuits — discover how quantum tech is powering the future of AI, cryptography, and much more!",
    slug: "/e/qubits-unleashed-quantum-computing-workshop",
    image: "/images/quantum-computing.png",
    category: "Workshops Flagship"
  },
  {
    title: "Game On! Unity Development Workshop",
    description: "Unlock the realm of game development! Explore game design, physics, scripting, and interactive environments while gaining expert insights into industry trends and workflows.",
    slug: "/e/game-on-unity-development-workshop",
    image: "/images/unity.png",
    category: "Workshops Flagship"
  },
  {
    title: "Silicon to Circuits: Semiconductor Workshop by Qualcomm",
    description: "Unravel the journey of electronics from raw silicon to complex integrated circuits in this insightful workshop. Discover how semiconductors and chip design power modern tech and shape future innovations.",
    slug: "/e/silicon-to-circuits-semiconductor-workshop-qualcomm",
    image: "/images/silicon-to-circuits.png",
    category: "Workshops Flagship"
  },
  {
    title: "Fly High: A Practical Drone Workshop by Garuda Aerospace",
    description: "Explore the fascinating world of drones and UAV technology! Learn about aerodynamics, flight control systems, navigation, and real-world applications of drones across various industries",
    slug: "/e/fly-high-drone-workshop-garuda-aerospace",
    image: "/images/fly-high-drone.png",
    category: "Workshops Flagship"
  },
  {
    title: "Hack the Future: Vidyut Hackathon by Amfoss",
    description: "A 36-hour national innovation marathon for B.Tech students across India, fostering creativity, collaboration, and tech-driven solutions to real-world challenges, ending with impactful project showcases.",
    slug: "/e/hack-the-future-vidyut-hackathon-amfoss",
    image: "/images/HacktheFutureVidyut.png",
    category: "Flagship Competitions"
  },
  {
    title: "TechTurf RoboSoccer National Competition",
    description: "A national robotics competition where student teams design and operate autonomous or remote-controlled wheeled robots in a fast-paced, soccer-style arena, promoting engineering skills, teamwork, and industry–academia collaboration.",
    slug: "/e/techturf-robosoccer-national-competition",
    image: "/images/TechTurfRoboSoccer.png",
    category: "Flagship Competitions"
  },
  {
    title: "War of the Bots",
    description: "Build and battle your custom robot in intense head-to-head combat. Test your bot's strength, strategy, and endurance in this ultimate showdown of engineering and innovation. Let the battle begin!",
    slug: "/e/war-of-the-bots",
    image: "/images/WARR.jpg",
    category: "Flagship Competitions"
  },
  {
    title: "Mini Off-Road RC Challenge",
    description: "Gear up for the Mini Off-Road RC Challenge 2025! Design, build, and race your RC vehicle through rugged terrain packed with obstacles and sharp turns. Test your engineering skills and driving precision in this ultimate off-road showdown",
    slug: "/e/mini-off-road-rc-challenge",
    image: "/images/rc.jpg",
    category: "Flagship Competitions"
  },
  {
    title: "Drone Racing by Pro Kerala",
    description: "Navigate through an adrenaline-pumping obstacle course, testing your FPV drone piloting skills, precision, and reflexes. Compete against the best and prove your dominance in the skies—only the fastest and most skilled will claim victory!",
    slug: "/e/drone-racing-pro-kerala",
    image: "/images/anton.png",
    category: "Flagship Competitions"
  }
];

// Utility Functions
export function getAllEvents() {
  return eventData.map(event => ({
    ...event,
    slug: domain + event.slug
  }));
}

export function getEventBySlug(slug) {
  return eventData.find(event => event.slug === slug || domain + event.slug === slug);
}

export function getEventsByCategory(category) {
  return eventData.filter(event => event.category.toLowerCase() === category.toLowerCase());
}

export function getCategories() {
  return [...new Set(eventData.map(event => event.category))];
}

export function getRandomEvent() {
  return eventData[Math.floor(Math.random() * eventData.length)];
}

export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single
    .trim();
}

export default eventData;
