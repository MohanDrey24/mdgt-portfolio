import { Card } from "./Card";
import { projects } from "../utils/data";

export const StackingCardsEffect = () => {
  return (
    <div className="relative">
      {projects.map((proj, index) => {
        return <Card key={index} {...proj} index={index} />;
      })}
    </div>
  );
};
