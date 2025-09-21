
"use client";

import { EnergyConsumption } from '@/components/dashboard/energy-consumption';
import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";

export default function EnergyPage() {
  const heroImage = placeholderImages.find(p => p.id === 'energy-hero');
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Energy Consumption" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl">
        <EnergyConsumption />
      </div>
    </main>
  );
}
