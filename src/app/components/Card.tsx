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
        style={{ backgroundColor: color }}
        className="flex items-center justify-center sm:w-[1000px] sm:h-[500px] w-full h-full sm:rounded-4xl rounded-none"
      >
        {title}
      </div>
    </div>
  );
};
