
"use client";

import { SafetyHazardDetection } from '@/components/dashboard/safety-hazard-detection';
import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";

export default function SafetyPage() {
  const heroImage = placeholderImages.find(p => p.id === 'safety-hero');
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Safety Hazard Detection" image={heroImage} />
      <div className="mx-auto w-full max-w-7xl">
        <SafetyHazardDetection />
      </div>
    </main>
  );
}
