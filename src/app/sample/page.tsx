"use client";

import { FolderScroll } from "../components/FolderScroll";
// import HorizontalScroll from "../components/HorizontalScroll";
import { MaskedComponent } from "../components/MaskedComponent";
import { NewHero } from "../components/NewHero";

const Sample = () => {
  return (
    <div>
      <NewHero />
      <MaskedComponent />
      {/* <HorizontalScroll /> */}
      <FolderScroll />
    </div>
  );
};

export default Sample;
