
"use client";

import { PageHero } from '@/components/page-hero';
import { placeholderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, BookOpen, FlaskConical, Factory } from 'lucide-react';

const historyData = [
    {
        icon: <Landmark className="h-8 w-8 text-accent" />,
        title: 'Ancient Origins (3000 BC - 476 AD)',
        description: 'The earliest known use of cementitious materials dates back to the Egyptians, who used calcined gypsum as a binder for building the pyramids. The Greeks and later the Romans advanced this technology significantly. The Romans perfected hydraulic cement by mixing slaked lime with pozzolana, a volcanic ash from Mount Vesuvius. This created a durable, water-resistant concrete used to build iconic structures like the Pantheon and the Colosseum, many of which still stand today.'
    },
    {
        icon: <BookOpen className="h-8 w-8 text-accent" />,
        title: 'The Middle Ages & Renaissance (5th - 17th Century)',
        description: 'After the fall of the Roman Empire, the art of making hydraulic cement was largely lost. Construction relied on lime mortars, which were less durable and hardened only through carbonation with air. It was not until the late Middle Ages that knowledge of hydraulic binders began to be rediscovered, primarily through the study of ancient Roman texts like Vitruvius\'s "De architectura".'
    },
    {
        icon: <FlaskConical className="h-8 w-8 text-accent" />,
        title: 'The Scientific Revolution (18th - 19th Century)',
        description: 'The 18th century marked a turning point. British engineer John Smeaton, tasked with rebuilding the Eddystone Lighthouse, systematically experimented with different limestones and pozzolanas. He rediscovered the principles of hydraulic lime, paving the way for modern cement. In 1824, Joseph Aspdin, an English bricklayer, patented a material he called "Portland Cement" because its color resembled the high-quality building stone from Portland, England. This was a crucial step, involving the heating of a specific mixture of limestone and clay to high temperatures.'
    },
    {
        icon: <Factory className="h-8 w-8 text-accent" />,
        title: 'The Modern Industrial Era (Late 19th Century - Present)',
        description: 'The late 19th century saw the development of the rotary kiln, which allowed for a continuous and more uniform manufacturing process. This innovation, combined with a better scientific understanding of cement chemistry, led to the mass production of consistent, high-quality Portland cement. This development fueled the construction boom of the 20th century, enabling the creation of modern infrastructure, from skyscrapers and dams to highways and bridges, fundamentally shaping the world we live in today.'
    }
];

export default function HistoryPage() {
  const heroImage = placeholderImages.find(p => p.id === 'history-hero');

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="A Brief History of Cement" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
            {historyData.map((item, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-start gap-4">
                        <div className="bg-accent/10 p-3 rounded-full">
                            {item.icon}
                        </div>
                        <div>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </main>
  );
}
