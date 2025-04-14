import { TMediaTypes } from '@/types/types';

export const typeToLabel = (mediaType: TMediaTypes) =>
	mediaType === 'movie' ? 'Movie' : 'TV Series';
export const typeToLink = (mediaType: TMediaTypes) =>
	mediaType === 'movie' ? 'movies' : 'series';
export const linkToType = (link: 'movies' | 'series'): TMediaTypes =>
	link === 'movies' ? 'movie' : 'tv';
