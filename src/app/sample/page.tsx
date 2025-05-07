'use client';

import { FolderScroll } from '@/app/components/FolderScroll';
import { MaskedComponent } from '@/app/components/MaskedComponent';
import { NewHero } from '@/app/components/NewHero';

const Sample = () => {
  return (
    <div>
      <NewHero />
      <MaskedComponent />
      <FolderScroll />
    </div>
  );
};

export default Sample;
