
"use client";

import { CementMixDesign } from '@/components/dashboard/cement-mix-design';
import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";

export default function MixDesignPage() {
  const heroImage = placeholderImages.find(p => p.id === 'mix-design-hero');
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Cement Mix Design" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl">
        <CementMixDesign />
      </div>
    </main>
  );
}
