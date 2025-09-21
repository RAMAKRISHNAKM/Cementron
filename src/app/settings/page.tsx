
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { PageHero } from "@/components/page-hero";
import { placeholderImages } from "@/lib/placeholder-images";

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();
  const heroImage = placeholderImages.find(p => p.id === 'page-hero-default');

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Settings" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your public profile and account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@cementron.com" />
                  </div>
                </div>
                 <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                       <Select defaultValue="plant-manager">
                          <SelectTrigger className="w-full sm:w-[280px]">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="plant-manager">Plant Manager</SelectItem>
                              <SelectItem value="quality-control">Quality Control</SelectItem>
                              <SelectItem value="maintenance-engineer">Maintenance Engineer</SelectItem>
                              <SelectItem value="environmental-officer">Environmental Officer</SelectItem>
                              <SelectItem value="shift-supervisor">Shift Supervisor</SelectItem>
                          </SelectContent>
                        </Select>
                  </div>
            </CardContent>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive alerts and updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive alerts for critical events and summaries.</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                </div>
                <Separator />
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Get urgent alerts sent directly to your phone.</p>
                    </div>
                    <Switch id="sms-notifications" />
                </div>
            </CardContent>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                 <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
            </CardContent>
             <CardHeader>
                <CardTitle>API</CardTitle>
                <CardDescription>Manage your API keys for external integrations.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <Input defaultValue="********************" readOnly className="flex-1" />
                    <Button className="w-full sm:w-auto shrink-0">Generate New Key</Button>
                 </div>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
