"use client";

import HorizontalScroll from "../components/HorizontalScroll";
import { MaskedComponent } from "../components/MaskedComponent";
import { NewHero } from "../components/NewHero";

const Sample = () => {
  return (
    <div>
      <NewHero />
      <MaskedComponent />
      <HorizontalScroll />
    </div>
  );
};

export default Sample;
