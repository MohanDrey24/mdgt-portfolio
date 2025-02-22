import { cn } from "../utils/cn";
import { ChevronDown } from "lucide-react";

type ScrollIndicatorProps = {
  className?: string;
};
const ScrollIndicator = ({ className }: ScrollIndicatorProps) => {
  return (
    <div className={cn(`absolute z-1000`, className)}>
      <span>Scroll to Continue</span>
    </div>
  );
};

export default ScrollIndicator;
