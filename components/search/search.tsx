'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { TCountry, TGenres } from '@/types/tmdb-types';
import { TMediaTypes } from '@/types/types';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons/icons';
import MovieTVSwitch from '@/components/search/movie-tv-switch';
import SelectCountry from '@/components/search/select-country';
import SelectGenre from '@/components/search/select-genre';
import SelectYear from '@/components/search/select-year';

type TProps = {
	movieGenres: TGenres;
	tvGenres: TGenres;
	countries: TCountry[];
};

export default memo(function Search({
	movieGenres,
	tvGenres,
	countries,
}: TProps) {
	const router = useRouter();
	const pathParams = useParams<{ slug?: string }>();
	const searchParamsReadonly = useSearchParams();

	const [filters, setFilters] = useState({
		type: (searchParamsReadonly?.get('type') as TMediaTypes) || 'movie',
		query: pathParams.slug || '',
		genreId: searchParamsReadonly?.get('genreId') || '',
		year: searchParamsReadonly?.get('year') || '',
		country: searchParamsReadonly?.get('country') || '',
	});
	console.log(filters);
	const currentGenres = filters.type === 'movie' ? movieGenres : tvGenres;

	const searchParams = new URLSearchParams();

	searchParams.set('type', filters.type);
	searchParams.set('genreId', filters.genreId || '');
	searchParams.set('year', filters.year || '');
	searchParams.set('country', filters.country || '');

	const removeQuery = () => {
		setFilters(prevFilters => ({
			...prevFilters,
			query: '',
		}));

		const clearedLink = `/search?${searchParams.toString()}`;
		router.push(clearedLink);
	};

	const resetFilters = () => {
		router.push('/search');

		setFilters({
			type: 'movie',
			query: '',
			genreId: '',
			year: '',
			country: '',
		});
	};

	const handleGenreIds = useCallback((genreId: string) => {
		setFilters(prevFilters => ({
			...prevFilters,
			genreId,
		}));
	}, []);

	const handleYears = useCallback((year: string) => {
		setFilters(prevFilters => ({
			...prevFilters,
			year,
		}));
	}, []);

	const handleCountries = useCallback((country: string) => {
		setFilters(prevFilters => ({
			...prevFilters,
			country,
		}));
	}, []);

	useEffect(() => {
		if (filters.type !== searchParamsReadonly?.get('type')) {
			setFilters(prevFilters => ({
				...prevFilters,
				genreId: '',
			}));
		}
	}, [filters.type, searchParamsReadonly]);

	return (
		<div>
			{countries ? (
				<div>
					{pathParams.slug ? (
						<div className="text-silver mb-7 flex-wrap items-center gap-2 text-xl xl:flex">
							<Heading
								className="text-silver"
								variant="h3"
								tag="h4"
							>
								Search results:
							</Heading>
							<div>
								<strong className="text-white">
									{decodeURI(pathParams.slug)}
								</strong>
							</div>
							<Icons.x
								className="ml-2 inline-block cursor-pointer text-primary"
								onClick={removeQuery}
							/>
						</div>
					) : (
						''
					)}
					<div className="text-silver mb-7 flex-wrap gap-2 text-xl xl:flex">
						<MovieTVSwitch
							type={filters.type}
							checkedChange={() => {
								setFilters(prevFilters => ({
									...prevFilters,
									type:
										prevFilters.type === 'movie'
											? 'tv'
											: 'movie',
								}));
							}}
						/>
						<Input
							className="w-full"
							placeholder="What are we watching today?"
							value={decodeURI(filters.query)}
							onChange={e =>
								setFilters(prevFilters => ({
									...prevFilters,
									query: e.target.value,
								}))
							}
						/>
					</div>
					<div className="mt-7 grid gap-7 lg:grid-cols-3">
						<SelectGenre
							currentGenre={currentGenres}
							defaultGenreId={filters.genreId}
							select={handleGenreIds}
						/>
						<SelectYear
							defaultYear={filters.year}
							select={handleYears}
						/>
						<SelectCountry
							countries={countries}
							placeholder={'Country'}
							defaultCountry={filters.country}
							select={handleCountries}
						/>
					</div>
					<div className="mt-7 flex flex-col justify-center gap-5 text-center lg:flex-row lg:justify-end">
						<Link
							href={`/search/${filters.query}?${searchParams.toString()}`}
							className="lg:mx-auto lg:translate-x-1/2"
						>
							<Button className="w-full lg:w-[200px]">
								Search
							</Button>
						</Link>
						<Button
							className="w-full lg:w-[200px]"
							onClick={resetFilters}
						>
							Reset filters
						</Button>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
});
