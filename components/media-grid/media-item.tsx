import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/lib/tailwind';
import { typeToLabel, typeToLink } from '@/utils/translations';

import { TMediaTypes } from '@/types/types';
import { TMDBImage500Url } from '@/config/tmdb-config';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import UserRating from '@/components/user-rating';

type TProps = {
	id: number;
	src: string;
	title: string;
	type: TMediaTypes;
	originalTitle?: string;
	created?: string;
	rating?: number;
	ratingCount?: number;
	className?: string;
};

export default function MediaItem({
	id,
	src,
	title,
	type,
	originalTitle,
	created,
	rating,
	ratingCount,
	className,
}: TProps) {
	const textType = typeToLabel(type);
	const linkType = typeToLink(type);

	return (
		<div
			className={cn(
				'relative mx-auto h-[520px] w-full max-w-[364px] overflow-hidden border border-primary bg-black sm:w-[364px]',
				className,
			)}
		>
			<Image
				src={TMDBImage500Url + src}
				alt=""
				width={364}
				height={520}
				className="h-full object-cover object-top"
			/>
			<div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-foreground to-transparent" />
			<div className="absolute bottom-0 w-full p-5 pb-0">
				<Badge className="mb-1.5 text-foreground">{textType}</Badge>
				<Heading tag="h4" variant="h3" className="pb-0 text-white">
					{title}
				</Heading>
				<div className="mt-3">
					<div className="text-silver text-sm">
						<div>{originalTitle}</div>
						<div>{created}</div>
					</div>
					{ratingCount && rating ? (
						<UserRating rating={rating} ratingCount={ratingCount} />
					) : (
						''
					)}
				</div>
				<div className="my-5 text-center">
					<Link href={`/movies-and-tv/${linkType}/${id}`}>
						<Button
							variant={'outline'}
							className="w-full bg-transparent text-white"
						>
							Find out more
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
