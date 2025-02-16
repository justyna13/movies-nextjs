import { api } from '@/server/helpers/api-helpers';

import {
	TCountry,
	TGenres,
	TMovieTMDB,
	TMovieTMDBDetailsWithCredits,
	TResTMDB,
	TSearchTMDBMovieReq,
	TSearchTMDBTVSeriesReq,
	TTMDBImages,
	TTMDBTVShowDetailsWithCredits,
	TTVShowTMDB,
} from '@/types/tmdb-types';
import { TMDBAPIUrl, TMDBHeaders } from '@/config/tmdb-config';

const TmdbService = {
	async getTrendingMovies() {
		const data = await api<TResTMDB<TMovieTMDB[]>, { language: string }>(
			`${TMDBAPIUrl}/trending/movie/week`,
			{
				params: {
					language: 'pl',
				},
				headers: TMDBHeaders,
				options: {
					next: {
						revalidate: 3600,
					},
				},
			},
		);

		return data?.results.splice(0, 3);
	},
	// https://api.themoviedb.org/3/movie/top_rated
	async getTopRatedMovies() {
		const data = await api<
			TResTMDB<TMovieTMDB[]>,
			{ language: string; region: string }
		>(`${TMDBAPIUrl}/movie/top_rated`, {
			params: {
				language: 'pl',
				region: 'PL',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});

		return data?.results.splice(0, 3);
	},
	// https://api.themoviedb.org/3/tv/top_rated
	async getTopRatedTV() {
		const data = await api<TResTMDB<TTVShowTMDB[]>, { language: string }>(
			`${TMDBAPIUrl}/tv/top_rated`,
			{
				params: {
					language: 'pl',
				},
				headers: TMDBHeaders,
				options: {
					next: {
						revalidate: 3600,
					},
				},
			},
		);

		return data?.results.splice(0, 3);
	},
	async getMovieDetails(id: number) {
		return await api<
			TMovieTMDBDetailsWithCredits,
			{ language: string; append_to_response: string }
		>(`${TMDBAPIUrl}/movie/${id}`, {
			params: {
				language: 'pl',
				append_to_response: 'credits',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});
	},
	async getMovieImages(id: number) {
		return await api<TTMDBImages, null>(
			`${TMDBAPIUrl}/movie/${id}/images`,
			{
				headers: TMDBHeaders,
				options: {
					next: {
						revalidate: 3600 * 24 * 7,
					},
				},
			},
		);
	},
	async getTVDetails(id: number) {
		return await api<
			TTMDBTVShowDetailsWithCredits,
			{ language: string; append_to_response: string }
		>(`${TMDBAPIUrl}/tv/${id}`, {
			params: {
				language: 'pl',
				append_to_response: 'credits',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});
	},
	async getTVImages(id: number) {
		return await api<TTMDBImages, null>(`${TMDBAPIUrl}/tv/${id}/images`, {
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600 * 24 * 7,
				},
			},
		});
	},
	async searchMovie(query: string) {
		return await api<TResTMDB<TMovieTMDB[]>, TSearchTMDBMovieReq>(
			`${TMDBAPIUrl}/search/movie`,
			{
				headers: TMDBHeaders,
				params: {
					query,
					language: 'pl',
				},
				options: {
					next: {
						revalidate: 3600 * 24 * 7,
					},
				},
			},
		);
	},
	async searchTv(query: string) {
		return await api<TResTMDB<TTVShowTMDB[]>, TSearchTMDBTVSeriesReq>(
			`${TMDBAPIUrl}/search/tv`,
			{
				headers: TMDBHeaders,
				params: {
					query,
					language: 'pl',
				},
				options: {
					next: {
						revalidate: 3600 * 24 * 7,
					},
				},
			},
		);
	},
	async getMovieGenres() {
		return await api<TGenres, { language: string }>(
			`${TMDBAPIUrl}/genre/movie/list`,
			{
				headers: TMDBHeaders,
				params: {
					language: 'pl',
				},
				options: {
					next: {
						revalidate: 3600 * 24 * 30,
					},
				},
			},
		);
	},
	async getTvGenres() {
		return await api<TGenres, { language: string }>(
			`${TMDBAPIUrl}/genre/tv/list`,
			{
				headers: TMDBHeaders,
				params: {
					language: 'pl',
				},
				options: {
					next: {
						revalidate: 3600 * 24 * 30,
					},
				},
			},
		);
	},
	async getCountries() {
		return await api<TCountry[], { language: string }>(
			`${TMDBAPIUrl}/configuration/countries`,
			{
				headers: TMDBHeaders,
				params: {
					language: 'pl',
				},
				options: {
					next: {
						revalidate: 3600 * 24 * 30,
					},
				},
			},
		);
	},
};

export default TmdbService;
