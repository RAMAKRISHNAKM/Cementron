
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SheetClose } from './ui/sheet';
import { AppLogo } from './icons';

const links = [
    { href: '/', label: 'Overview' },
    { href: '/raw-materials', label: 'Raw Materials' },
    { href: '/clinkerization', label: 'Clinkerization' },
    { href: '/quality', label: 'Quality' },
    { href: '/fuels', label: 'Alt. Fuels' },
    { href: '/cross-process', label: 'Cross-Process' },
    { href: '/energy', label: 'Energy' },
    { href: '/emissions', label: 'Emissions' },
    { href: '/maintenance', label: 'Maintenance' },
    { href: '/supply-chain', label: 'Supply Chain' },
    { href: '/safety', label: 'Safety' },
    { href: '/mix-design', label: 'Mix Design' },
    { href: '/forecasting', label: 'Forecasting' },
    { href: '/history', label: 'History' },
    { href: '/manufacturing', label: 'Process' },
]

interface NavLinksProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export function NavLinks({ isMobile = false, onLinkClick }: NavLinksProps) {
    const pathname = usePathname();
    
    const Wrapper = isMobile ? 'div' : 'nav';
    const wrapperProps = isMobile 
        ? { className: "grid gap-2 font-medium" } 
        : { className: "hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6" };

    const navContent = (
        <>
            {!isMobile && (
                 <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <AppLogo className="h-6 w-6 text-primary" />
                    <span className="font-bold">Cementron</span>
                </Link>
            )}
            {links.map(link => {
                const linkComponent = (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={onLinkClick}
                        className={cn(
                            "text-foreground/80 transition-colors hover:text-foreground", 
                            {
                                "text-foreground font-semibold": pathname === link.href,
                                "py-2 block text-lg": isMobile,
                                "text-sm": !isMobile
                            }
                        )}
                    >
                        {link.label}
                    </Link>
                );

                if (isMobile) {
                    return (
                        <SheetClose asChild key={link.href}>
                            {linkComponent}
                        </SheetClose>
                    );
                }

                return linkComponent;
            })}
        </>
    )

    if (isMobile) {
        return <div className="grid gap-2 font-medium">{navContent}</div>
    }

    return (
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
           {navContent}
        </nav>
    )
}
