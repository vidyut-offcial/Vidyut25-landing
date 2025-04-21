'use client';

import { GIFCard } from "./ui/gif-card";

export default function MultiEventsSection({ onSectionChange }) {
  const cards = [
    {
      title: "Pro Show",
      description: "Description",
      bg: "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif",
      ctaLink: "/proshow",
    },
    {
      title: "Events",
      description: "Description",
      bg: "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif",
      ctaLink: "/events",
    },
    {
      title: "Car Show",
      description: "Description",
      bg: "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif",
      ctaLink: "/carshow",
    },
  ];

  return (
    <section
      id="multi-events-section"
      className="min-h-screen w-screen select-none bg-black relative overflow-hidden flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-16 items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {cards.map((card, index) => (
        <a
          key={index}
          href={card.ctaLink}
          target="__blank"
          className="w-full sm:w-[80%] md:w-[60%] lg:w-auto"
        >
          <GIFCard {...card} />
        </a>
      ))}
    </section>
  );
}
