export type TResTMDB<TData> = {
	page: number;
	results: TData;
	total_pages: number;
	total_results: number;
};

export type TMovieTMDB = {
	backdrop_path: string;
	id: number;
	title: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: string;
	adult: boolean;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	release_date: string; // ISO 8601 date format (e.g., "2024-12-25")
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type TTVShowTMDB = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	first_air_date: string; // Data w formacie ISO (np. "2008-01-20")
	name: string;
	vote_average: number;
	vote_count: number;
};

// Movie details

// Typ dla kolekcji, do której należy film
type TCollection = {
	id: number;
	name: string;
	poster_path: string | null;
	backdrop_path: string | null;
};

// Typ dla gatunku filmu
export type TGenre = {
	id: number;
	name: string;
};

export type TGenres = {
	genres: TGenre[];
};

export type TCountry = {
	iso_3166_1: string;
	english_name: string;
	native_name: string;
};

// Typ dla firmy produkcyjnej
type TProductionCompany = {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
};

// Typ dla kraju produkcji
type TProductionCountry = {
	iso_3166_1: string;
	name: string;
};

// Typ dla języków, w których film został wydany
type TSpokenLanguage = {
	english_name: string;
	iso_639_1: string;
	name: string;
};

// Główny typ dla filmu
export type TMovieTMDBDetails = {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection?: TCollection; // Opcjonalne pole
	budget: number;
	genres: TGenre[];
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: TProductionCompany[];
	production_countries: TProductionCountry[];
	release_date: string; // ISO format (e.g., "1974-12-20")
	revenue: number;
	runtime: number;
	spoken_languages: TSpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type TTMDBCast = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
};

export type TMovieTMDBDetailsWithCredits = TMovieTMDBDetails & {
	credits: {
		cast: TTMDBCast[];
	};
};
// End movie details

// Movie Image
type TTMDBImage = {
	aspect_ratio: number;
	height: number;
	iso_639_1: string | null;
	file_path: string;
	vote_average: number;
	vote_count: number;
	width: number;
};

export type TTMDBImages = {
	backdrops: TTMDBImage[] | [];
	logos: TTMDBImage[] | [];
	posters: TTMDBImage[] | [];
	id: number;
};

// TV series details
// Typy podrzędne
type TCreator = {
	id: number;
	credit_id: string;
	name: string;
	original_name: string;
	gender: number;
	profile_path: string;
};

type TEpisode = {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: number;
	episode_type: string;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string;
};

type TNetwork = {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
};

type TSeason = {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
};

// Typ główny
export type TTMDBTVShow = {
	adult: boolean;
	backdrop_path: string;
	created_by: TCreator[];
	episode_run_time: number[];
	first_air_date: string;
	genres: TGenre[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: TEpisode;
	name: string;
	next_episode_to_air: TEpisode | null;
	networks: TNetwork[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: TProductionCompany[];
	production_countries: TProductionCountry[];
	seasons: TSeason[];
	spoken_languages: TSpokenLanguage[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
};

export type TTMDBTVShowDetailsWithCredits = TTMDBTVShow & {
	credits: {
		cast: TTMDBCast[];
	};
};
// end TV series details

export type TSearchTMDBMovieReq = {
	query: string;
	include_adults?: boolean;
	language?: string;
	primary_release_date?: string;
	page?: number;
	region?: string;
	year?: string;
};

export type TSearchTMDBTVSeriesReq = {
	query: string;
	include_adults?: boolean;
	language?: string;
	first_air_date?: string;
	page?: number;
	region?: string;
	year?: string;
};
