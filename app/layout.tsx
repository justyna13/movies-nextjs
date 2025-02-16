import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';

import { cn } from '@/utils/libs/tailwind';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
	title: 'Movies',
	description: 'Easy way to find a movie to watch',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					'font-poppins min-h-screen bg-background text-foreground antialiased',
					poppins.variable,
				)}
			>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
