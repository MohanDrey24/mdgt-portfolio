import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type CardProps = {
  bgColor: string;
  projectImage?: string;
  title: string;
  description?: string;
  technologies?: string[];
  id: number;
};

interface Card {
  card: CardProps;
}

const HorizontalScroll = () => {
  return (
    <div>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6565%"]);

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-amber-400">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: Card) => {
  return (
    <div
      key={card.id}
      className="group relative bg-[url('/assets/static.png')] h-screen w-screen overflow-hidden"
    >
      <div
        style={{
          backgroundColor: `${card.bgColor}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110 opacity-[0.85]"
      ></div>
      <div className=" absolute inset-0 z-10 grid grid-flow-col place-content-center gap-20">
        {card.projectImage && (
          <Image
            src={card.projectImage}
            priority
            alt="Project Image"
            width={750}
            height={750}
          />
        )}
        <div className="flex flex-col">
          <span className="text-6xl font-extrabold font-dm uppercase text-black">
            {card.title}
          </span>
          <span>{card.description}</span>
          <div>
            <span>Technologies used:</span>
            <ul className="list-disc">
              {card.technologies?.map((tech: string) => {
                return <li key={tech}>{tech}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;

const cards = [
  {
    bgColor: "white",
    projectImage: "/assets/HIRE_SPHERE.jpg",
    title: "Hire Sphere",
    description: "A job posting website",
    technologies: [
      "Next.js",
      "NestJS",
      "Docker",
      "AWS EC2",
      "TailwindCSS",
      "PostreSQL(Neon)",
    ],
    id: 1,
  },
  {
    bgColor: "yellow",
    projectImage: "/assets/windmill.svg",
    title: "Title 2",
    description: "",
    technologies: [],
    id: 2,
  },
  {
    bgColor: "black",
    projectImage: "/assets/static.png",
    title: "Title 3",
    description: "",
    technologies: [],
    id: 3,
  },
];
