import { cn } from '@/utils/lib/tailwind';

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('bg-primary/10 animate-pulse rounded-md', className)}
			{...props}
		/>
	);
}

export { Skeleton };
