'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { sidebarLinks } from '@/constants';

import { cn } from '@/lib/utils';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';

const MobileNav = () => {
    const pathname = usePathname();

    return (
        <section>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        alt="menu"
                        width={30}
                        height={30}
                        className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="border-none bg-black-1 text-white-1"
                >
                    <Link
                        href="/"
                        className="flex cursor-pointer items-center gap-1 pb-10 pl-4"
                    >
                        <Image
                            src="/icons/logo.svg"
                            alt="logo"
                            width={23}
                            height={27}
                        />
                        <h1 className="text-24 text-white ml-2 font-extrabold text-white-1">
                            Podcastr
                        </h1>
                    </Link>
                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-6">
                                {sidebarLinks.map(
                                    ({ route, label, imgURL }) => {
                                        const isActive =
                                            pathname === route ||
                                            pathname.startsWith(`${route}/`);

                                        return (
                                            <SheetClose asChild key={label}>
                                                <Link
                                                    href={route}
                                                    className={cn(
                                                        'flex items-center justify-start gap-3 py-4 max-lg:px-4',
                                                        {
                                                            'border-r-4 border-orange-1 bg-nav-focus':
                                                                isActive,
                                                        },
                                                    )}
                                                >
                                                    <Image
                                                        src={imgURL}
                                                        alt={label}
                                                        width={24}
                                                        height={24}
                                                    />
                                                    <p>{label}</p>
                                                </Link>
                                            </SheetClose>
                                        );
                                    },
                                )}
                            </nav>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;
