
"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Zap,
  TestTube,
  Recycle,
  Droplets,
  Factory,
  Gauge,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart as BarChartRechart,
  Pie,
  PieChart as PieChartRechart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import { placeholderImages } from "@/lib/placeholder-images";

const barChartData = [
  { month: "Jan", saved: 186, cost: 80 },
  { month: "Feb", saved: 305, cost: 200 },
  { month: "Mar", saved: 237, cost: 120 },
  { month: "Apr", saved: 73, cost: 190 },
  { month: "May", saved: 209, cost: 130 },
  { month: "Jun", saved: 214, cost: 140 },
];

const barChartConfig = {
  saved: {
    label: "Energy Saved (MWh)",
    color: "hsl(var(--chart-1))",
  },
  cost: {
    label: "Cost Savings (₹ Lakhs)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const pieChartData = [
    { name: 'Petcoke', value: 65, fill: 'hsl(var(--chart-1))' },
    { name: 'Coal', value: 15, fill: 'hsl(var(--chart-2))' },
    { name: 'RDF', value: 10, fill: 'hsl(var(--chart-3))' },
    { name: 'Biomass', value: 10, fill: 'hsl(var(--chart-4))' },
]

const pieChartConfig = {
    value: {
        label: 'Fuel Mix',
    },
    Petcoke: {
        label: 'Petcoke',
        color: 'hsl(var(--chart-1))',
    },
    Coal: {
        label: 'Coal',
        color: 'hsl(var(--chart-2))',
    },
    RDF: {
        label: 'RDF',
        color: 'hsl(var(--chart-3))',
    },
    Biomass: {
        label: 'Biomass',
        color: 'hsl(var(--chart-4))',
    },
} satisfies ChartConfig;


export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'overview-hero');

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="relative h-[300px] md:h-[400px] w-full">
          {heroImage &&
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              data-ai-hint={heroImage.imageHint}
              className="object-cover"
            />
          }
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 md:p-8 lg:p-12">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-foreground drop-shadow-md">
              Forging the Future of Cement with AI
            </h1>
            <p className="mt-2 text-lg md:text-xl text-foreground/90 max-w-2xl drop-shadow-sm">
              Harnessing AI to drive efficiency, profitability, and environmental stewardship in the cement industry.
            </p>
          </div>
        </div>

        <div className="p-4 md:p-8 lg:p-8">
          <Card className="w-full max-w-7xl mx-auto">
            <CardHeader>
              <CardTitle>Plant Sustainability & Performance</CardTitle>
              <CardDescription>
                An overview of key sustainability and performance indicators.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Production Output
                    </CardTitle>
                    <Factory className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8,950 t/day</div>
                    <p className="text-xs text-muted-foreground">
                      +1.5% vs. target
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">OEE</CardTitle>
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">91.5%</div>
                    <p className="text-xs text-muted-foreground">
                      Top quartile performance
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Specific Energy
                    </CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.1 GJ/t</div>
                    <p className="text-xs text-muted-foreground">
                      -4.2% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      CO₂ Emissions
                    </CardTitle>
                    <TestTube className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0.65 tCO₂/t</div>
                    <p className="text-xs text-muted-foreground">
                      -5% vs. industry average
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Thermal Substitution
                    </CardTitle>
                    <Recycle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">35%</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Clinker Quality (C3S)
                    </CardTitle>
                    <FlaskConical className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">64%</div>
                    <p className="text-xs text-muted-foreground">
                      Consistently above target
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Water Conservation
                    </CardTitle>
                    <Droplets className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">95%</div>
                    <p className="text-xs text-muted-foreground">
                      Recycled water usage
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Safety Score
                    </CardTitle>
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">98/100</div>
                    <p className="text-xs text-muted-foreground">
                      0 incidents last 30 days
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-8 lg:grid-cols-5">
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Monthly Savings</CardTitle>
                    <CardDescription>
                      Energy and cost savings over the last 6 months.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={barChartConfig} className="min-h-[200px] w-full">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChartRechart data={barChartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <CartesianGrid vertical={false} />
                          <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                          />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                          />
                          <Bar
                            dataKey="saved"
                            fill="var(--color-saved)"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar
                            dataKey="cost"
                            fill="var(--color-cost)"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChartRechart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Current Fuel Mix</CardTitle>
                    <CardDescription>
                      Breakdown of fuel sources for thermal energy.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <ChartContainer config={pieChartConfig} className="min-h-[200px] w-full">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChartRechart>
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <Pie data={pieChartData} dataKey="value" nameKey="name" innerRadius="50%">
                                  {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                  ))}
                                </Pie>
                            </PieChartRechart>
                        </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
