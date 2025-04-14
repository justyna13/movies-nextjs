import { redirect } from 'next/navigation';
import { Slugs } from '@/constants/slugs';
import TmdbService from '@/server/services/tmdb-service';

import { TMovieTMDB, TTVShowTMDB } from '@/types/tmdb-types';
import { TMediaFilterSearchParams } from '@/types/types';
import Heading from '@/components/ui/heading';
import Section from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';
import MediaGrid from '@/components/media-grid/media-grid';
import Search from '@/components/search/search';

type TProps = {
	params: Promise<{
		slug?: string[];
	}>;
	searchParams?: Promise<TMediaFilterSearchParams>;
};

export default async function SearchPage({ params, searchParams }: TProps) {
	const { slug } = await params;
	const searchParamsValues = await searchParams;

	if (slug !== undefined && slug.length > 1) {
		redirect(Slugs.BASE);
	}

	const type = searchParamsValues?.type || 'movie';
	const slugValue = slug ? slug[0] : undefined;

	const [mediaListRes, movieGenres, tvGenres, countries] = await Promise.all([
		TmdbService.filterMedia(slugValue, searchParamsValues),
		TmdbService.getMovieGenres(),
		TmdbService.getTvGenres(),
		TmdbService.getCountries(),
	]);

	const mediaList = mediaListRes?.results;
	let mediaGrid = null;

	if (mediaList && type === 'movie') {
		mediaGrid = (
			<MediaGrid
				mediaType="movie"
				mediaList={mediaList as TMovieTMDB[]}
			/>
		);
	} else if (mediaList && type === 'tv') {
		mediaGrid = (
			<MediaGrid mediaType="tv" mediaList={mediaList as TTVShowTMDB[]} />
		);
	}

	let mediaHeading = null;

	if (mediaList && type === 'movie') {
		mediaHeading = (
			<Heading tag="h2" variant="h3">
				Movies ({mediaListRes?.total_results})
			</Heading>
		);
	} else if (mediaList && type === 'tv') {
		mediaHeading = (
			<Heading tag="h2" variant="h3">
				Series ({mediaListRes?.total_results})
			</Heading>
		);
	} else {
		mediaHeading = (
			<Heading tag="h2" variant="h3">
				No results
			</Heading>
		);
	}
	return (
		<article>
			<Section>
				{movieGenres && tvGenres && countries ? (
					<Search
						countries={countries}
						movieGenres={movieGenres}
						tvGenres={tvGenres}
					/>
				) : (
					''
				)}
			</Section>
			<Section>
				{mediaHeading}
				<Separator />
				{mediaGrid}
			</Section>
		</article>
	);
}
