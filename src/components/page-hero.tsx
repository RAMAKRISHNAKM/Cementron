
'use client';

import { type ImagePlaceholder } from "@/lib/placeholder-images";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  image?: ImagePlaceholder;
}

export function PageHero({ title, image }: PageHeroProps) {
  return (
    <div className="space-y-4">
      <div className="mx-auto w-full max-w-7xl">
        <h1 className="font-headline text-3xl font-semibold">
          {title}
        </h1>
      </div>
      {image &&
        <div className="relative mx-auto w-full max-w-7xl rounded-lg overflow-hidden h-[200px] md:h-[250px]">
          <Image
            src={image.imageUrl}
            alt={image.description}
            fill
            data-ai-hint={image.imageHint}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
      }
    </div>
  )
}
