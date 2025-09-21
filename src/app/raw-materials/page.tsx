
"use client";

import { RawMaterials } from '@/components/dashboard/raw-materials';
import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";

export default function RawMaterialsPage() {
  const heroImage = placeholderImages.find(p => p.id === 'raw-materials-hero');
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Raw Materials" image={heroImage} />
      <div className="mx-auto w-full max-w-7xl">
        <RawMaterials />
      </div>
    </main>
  );
}
