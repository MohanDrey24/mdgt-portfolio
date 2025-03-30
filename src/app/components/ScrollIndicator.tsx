import { cn } from "@/app/utils/cn";

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
