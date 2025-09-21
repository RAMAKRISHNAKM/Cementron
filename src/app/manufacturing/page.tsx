
"use client";

import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mountain, Wind, Blend, Flame, Box, Package } from 'lucide-react';

const processSteps = [
    {
        step: 1,
        icon: <Mountain className="h-8 w-8 text-primary" />,
        title: 'Step 1: Quarrying & Raw Material Extraction',
        description: 'The process begins with extracting the primary raw materials, mainly limestone (providing calcium) and clay or shale (providing silica, alumina, and iron). These materials are quarried from rock deposits, often located near the cement plant. The extracted rock is crushed into smaller, more manageable pieces (typically around 3/4 inch).'
    },
    {
        step: 2,
        icon: <Wind className="h-8 w-8 text-primary" />,
        title: 'Step 2: Raw Grinding & Proportioning',
        description: 'The crushed limestone is combined with other materials like clay, iron ore, or fly ash in precise proportions. This mixture is then ground into a very fine powder known as "raw meal" in a large horizontal rotating mill containing steel balls. This fine grinding is crucial for the subsequent chemical reactions.'
    },
    {
        step: 3,
        icon: <Blend className="h-8 w-8 text-primary" />,
        title: 'Step 3: Blending & Homogenization',
        description: 'The raw meal is transported to a blending silo where it is thoroughly homogenized. Compressed air is used to mix the powder, ensuring the chemical composition is uniform throughout the batch. This consistency is essential for producing high-quality, predictable clinker in the next stage.'
    },
    {
        step: 4,
        icon: <Flame className="h-8 w-8 text-primary" />,
        title: 'Step 4: Pyroprocessing (Clinkerization)',
        description: 'This is the heart of the cement manufacturing process. The homogenized raw meal is fed into a large, inclined rotary kiln. The kiln rotates slowly as it is heated to extreme temperatures, reaching up to 1450°C (2640°F). This intense heat causes chemical and physical changes, transforming the raw meal into a new, marble-sized substance called "clinker".'
    },
    {
        step: 5,
        icon: <Box className="h-8 w-8 text-primary" />,
        title: 'Step 5: Finish Grinding',
        description: 'The cooled clinker is moved to another rotating mill, similar to the raw grinding stage. Here, it is ground into an extremely fine powder. During this process, a small amount of gypsum (typically 3-5%) is added. Gypsum is crucial for controlling the setting time of the final cement product.'
    },
    {
        step: 6,
        icon: <Package className="h-8 w-8 text-primary" />,
        title: 'Step 6: Packing & Distribution',
        description: 'The final product, now recognizable as cement, is so fine that it can be pneumatically pumped to storage silos. From there, it is either bagged by automated machines or loaded directly into bulk tankers for distribution to construction sites, ready-mix concrete plants, and hardware stores.'
    }
];

export default function ManufacturingPage() {
  const heroImage = placeholderImages.find(p => p.id === 'manufacturing-hero');

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Phases of Cement Manufacturing" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl">
         <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border transform -translate-x-1/2 hidden md:block"></div>
            {processSteps.map((step, index) => (
                <div key={step.step} className="relative mb-8 md:mb-12">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="md:w-1/2 md:pr-8 md:text-right flex md:flex-row-reverse items-start gap-4">
                             <div className="bg-primary/10 p-4 rounded-full mt-1">
                                {step.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-primary">{step.title}</h3>
                                <p className="text-muted-foreground mt-2">{step.description}</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 md:pl-8"></div>
                         <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-primary text-primary font-bold text-lg">
                            {step.step}
                        </div>
                    </div>
                 </div>
            ))}
        </div>
      </div>
    </main>
  );
}
