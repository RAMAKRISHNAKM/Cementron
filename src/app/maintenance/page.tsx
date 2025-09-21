
"use client";

import { PredictiveMaintenance } from '@/components/dashboard/predictive-maintenance';
import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";

export default function MaintenancePage() {
  const heroImage = placeholderImages.find(p => p.id === 'maintenance-hero');
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Predictive Maintenance" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl">
        <PredictiveMaintenance />
      </div>
    </main>
  );
}
