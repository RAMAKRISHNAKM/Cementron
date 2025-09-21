
"use client";

import { AlternativeFuels } from '@/components/dashboard/alternative-fuels';
import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";

export default function FuelsPage() {
  const heroImage = placeholderImages.find(p => p.id === 'fuels-hero');
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Alternative Fuels" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl">
        <AlternativeFuels />
      </div>
    </main>
  );
}
