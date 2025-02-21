import { ArrowDown } from "lucide-react";
import { cn } from "../utils/cn";

type ScrollIndicatorProps = {
  size?: string | number;
  color?: string;
  className?: string;
};
const ScrollIndicator = ({
  size = 24,
  color = "white",
  className,
}: ScrollIndicatorProps) => {
  return (
    <div
      className={cn(
        `absolute z-1000 animate-bounce border-2 rounded-full`,
        className
      )}
    >
      <ArrowDown size={size} color={color} />
    </div>
  );
};

export default ScrollIndicator;
