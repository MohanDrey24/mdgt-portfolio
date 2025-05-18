import { cn } from "../utils/cn";

interface CardProps {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
  className?: string;
}

export const Card = ({
  title,
  description,
  src,
  link,
  color,
  className,
}: CardProps) => {
  return (
    <div className="sticky top-0 h-screen flex items-center justify-center">
      <div
        style={{ backgroundColor: color }}
        className={cn(
          "flex items-center justify-center w-full h-full",
          className
        )}
      >
        {title}
      </div>
    </div>
  );
};
