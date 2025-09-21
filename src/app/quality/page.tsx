
"use client";

import { QualityAssurance } from '@/components/dashboard/quality-assurance';
import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";

export default function QualityPage() {
  const heroImage = placeholderImages.find(p => p.id === 'quality-hero');
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Quality Assurance" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl">
        <QualityAssurance />
      </div>
    </main>
  );
}
