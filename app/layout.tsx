import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';

import { cn } from '@/utils/libs/tailwind';

import { SidebarTrigger } from '@/components/ui/sidebar';
import Footer from '@/components/layout/footer';
import AppSidebar from '@/components/layout/sidebar';
import Provider from '@/components/providers/providers';

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
				<Provider>
					<AppSidebar />
					<main>
						<SidebarTrigger />
						{children}
					</main>
					<Footer />
				</Provider>
			</body>
		</html>
	);
}
