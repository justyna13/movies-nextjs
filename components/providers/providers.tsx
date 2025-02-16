'use client';

import { ReactNode } from 'react';

import { SidebarProvider } from '@/components/ui/sidebar';

type TProps = {
	children: ReactNode;
};

export default function Provider({ children }: TProps) {
	return <SidebarProvider>{children}</SidebarProvider>;
}
