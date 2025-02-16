'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

import { SidebarProvider } from '@/components/ui/sidebar';

type TProps = {
	children: ReactNode;
};

export default function Provider({ children }: TProps) {
	return (
		<SessionProvider>
			<SidebarProvider>{children}</SidebarProvider>
		</SessionProvider>
	);
}
