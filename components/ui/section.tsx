import { ReactNode } from 'react';
import { cn } from '@/utils/lib/tailwind';

type TProps = {
	children: ReactNode;
	className?: string;
};

export default function Section({ children, className }: TProps) {
	return (
		<section className={cn('container my-16 xl:my-24', className)}>
			{children}
		</section>
	);
}
