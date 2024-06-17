import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import ConvexClerkProvider from '@/providers/ConvexClerkProvider';
import AudioProvider from '@/providers/AudioProvider';

import './globals.css';

const font = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Podcastr',
    description: 'Generate your podcast using AI',
    icons: {
        icon: '/icons/logo.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ConvexClerkProvider>
            <html lang="en">
                <AudioProvider>
                    <body className={font.className}>{children}</body>
                </AudioProvider>
            </html>
        </ConvexClerkProvider>
    );
}
