import { TMovieTMDB, TTVShowTMDB } from '@/types/tmdb-types';
import MediaItem from '@/components/media-grid/media-item';

type TProps =
	| {
			mediaType: 'movie';
			mediaList: TMovieTMDB[];
	  }
	| {
			mediaType: 'tv';
			mediaList: TTVShowTMDB[];
	  };

export default async function MediaGrid({ mediaType, mediaList }: TProps) {
	let mediaGridData;

	if (mediaType === 'movie') {
		mediaGridData = mediaList.map(movie => (
			<MediaItem
				key={movie.id}
				id={movie.id}
				src={movie.poster_path}
				title={movie.title}
				originalTitle={movie.original_title}
				rating={movie.vote_average}
				ratingCount={movie.vote_count}
				created={movie.release_date}
				type="movie"
			/>
		));
	} else if (mediaType === 'tv') {
		mediaGridData = mediaList.map(movie => (
			<MediaItem
				key={movie.id}
				id={movie.id}
				src={movie.poster_path}
				title={movie.name}
				originalTitle={movie.original_name}
				rating={movie.vote_average}
				created={movie.first_air_date}
				ratingCount={movie.vote_count}
				type="tv"
			/>
		));
	}
	return <div className="grid gap-5 xl:grid-cols-3">{mediaGridData}</div>;
}
