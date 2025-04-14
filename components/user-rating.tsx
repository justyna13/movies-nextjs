import { cn } from '@/utils/lib/tailwind';

import { ratingTexts } from '@/config/misc-config';

type TProps = {
	rating: number;
	ratingCount: number;
	variant?: 'small' | 'large';
};

export default function UserRating({
	rating,
	ratingCount,
	variant = 'small',
}: TProps) {
	let ratingText;

	if (variant === 'large') {
		const roundedRating = Math.round(rating);
		ratingText = ratingTexts[roundedRating];
	}
	return (
		<div
			className={cn(
				'my-5 flex items-center',
				variant === 'small' ? 'gap-3' : 'gap-7',
			)}
		>
			<div
				className={cn(
					'flex items-center justify-center rounded-full bg-primary font-bold',
					variant === 'small' ? 'size-10' : 'size-24 text-4xl',
				)}
			>
				{isNaN(rating) ? '-' : rating.toFixed(1)}
			</div>
			{ratingText ? (
				<div>
					<div className="text-xl font-bold text-white">
						{ratingText}
					</div>
					<div className="text-silver">{ratingCount} rates</div>
				</div>
			) : (
				<div className="text-silver">{ratingCount} rates</div>
			)}
		</div>
	);
}
