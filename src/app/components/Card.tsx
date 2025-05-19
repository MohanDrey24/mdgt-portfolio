import { cn } from "../utils/cn";

interface CardProps {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
  index: number;
}

export const Card = ({
  title,
  description,
  src,
  link,
  color,
  index,
}: CardProps) => {
  return (
    <div className="sticky top-0 h-screen flex items-center justify-center">
      <div
        // top is not working as expected
        style={{ backgroundColor: color, top: `calc(-5vh + ${index * 25}px)` }}
        className="flex items-center justify-center w-full h-full"
      >
        {title}
      </div>
    </div>
  );
};
