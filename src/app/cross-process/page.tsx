
"use client";

import { CrossProcess } from '@/components/dashboard/cross-process';
import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";

export default function CrossProcessPage() {
  const heroImage = placeholderImages.find(p => p.id === 'cross-process-hero');
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Cross-Process Optimization" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl">
        <CrossProcess />
      </div>
    </main>
  );
}
