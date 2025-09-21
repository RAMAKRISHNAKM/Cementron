
"use client";

import { SupplyChainOptimization } from '@/components/dashboard/supply-chain-optimization';
import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";

export default function SupplyChainPage() {
  const heroImage = placeholderImages.find(p => p.id === 'supply-chain-hero');
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Supply Chain Optimization" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl">
        <SupplyChainOptimization />
      </div>
    </main>
  );
}
