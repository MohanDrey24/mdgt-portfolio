import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type CardProps = {
  bgColor: string;
  projectImage: string;
  title: string;
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
      className="group relative bg-[url('/assets/ambot.png')] h-screen w-screen overflow-hidden"
    >
      <div
        style={{
          backgroundColor: `${card.bgColor}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110 opacity-[0.85]"
      ></div>
      <div className=" absolute inset-0 z-10 grid place-content-center">
        <Image
          src={card.projectImage}
          alt="Project Image"
          width={50}
          height={50}
        />
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default HorizontalScroll;

const cards = [
  {
    bgColor: "white",
    projectImage: "/assets/clover.svg",
    title: "Title 1",
    id: 1,
  },
  {
    bgColor: "yellow",
    projectImage: "/assets/windmill.svg",
    title: "Title 2",
    id: 2,
  },
  {
    bgColor: "black",
    projectImage: "/assets/ambot.png",
    title: "Title 3",
    id: 3,
  },
];
