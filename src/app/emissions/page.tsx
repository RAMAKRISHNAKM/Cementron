
"use client";

import { EmissionsControl } from '@/components/dashboard/emissions-control';
import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";

export default function EmissionsPage() {
  const heroImage = placeholderImages.find(p => p.id === 'emissions-hero');
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Emissions Control" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl">
        <EmissionsControl />
      </div>
    </main>
  );
}
