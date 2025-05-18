"use client";

import { MaskedComponent } from "@/app/components/MaskedComponent";
import { NewHero } from "@/app/components/NewHero";
import { StackingCardsEffect } from "../components/StackingCardsEffect";

const Sample = () => {
  return (
    <div>
      <NewHero />
      <MaskedComponent />
      <StackingCardsEffect />
    </div>
  );
};

export default Sample;
