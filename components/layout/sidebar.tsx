import Link from 'next/link';

import { sidebarConfig, TSidebarItem } from '@/config/sidebar-config';
import { Separator } from '@/components/ui/separator';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

export default function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader />
			<SidebarContent>
				<AppSidebarGroup groupItems={sidebarConfig.main} />
				<Separator />
				<AppSidebarGroup groupItems={sidebarConfig.secondary} />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}

function AppSidebarGroup({ groupItems }: { groupItems: TSidebarItem[] }) {
	return (
		<SidebarGroup>
			<SidebarMenu>
				<SidebarGroupContent>
					{groupItems.map(item => (
						<SidebarMenuItem key={item.label}>
							<SidebarMenuButton asChild>
								<Link href={item.slug}>{item.label}</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarGroupContent>
			</SidebarMenu>
		</SidebarGroup>
	);
}
