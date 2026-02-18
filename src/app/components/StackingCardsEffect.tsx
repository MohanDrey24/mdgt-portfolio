import { Card } from "./Card";
import { projects } from "../utils/data";

export const StackingCardsEffect = () => {
  return (
    <main className="bg-black opacity-[0.85]">
      {projects.map((proj, index) => {
        return <Card key={index} {...proj} index={index} />;
      })}
    </main>
  );
};
