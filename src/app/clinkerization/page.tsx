
"use client";

import { Clinkerization } from '@/components/dashboard/clinkerization';
import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";

export default function ClinkerizationPage() {
  const heroImage = placeholderImages.find(p => p.id === 'clinkerization-hero');
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Clinkerization" image={heroImage} />
      <div className="mx-auto w-full max-w-7xl">
        <Clinkerization />
      </div>
    </main>
  );
}
