
"use client";

import { MarketForecasting } from '@/components/dashboard/market-forecasting';
import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";

export default function ForecastingPage() {
  const heroImage = placeholderImages.find(p => p.id === 'forecasting-hero');
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Market Forecasting" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl">
        <MarketForecasting />
      </div>
    </main>
  );
}
