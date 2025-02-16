export const TMDBAPIUrl = 'https://api.themoviedb.org/3';
export const TMDBHeaders = {
	Authorization: `Bearer ${process.env.MOVIE_DB_TOKEN}`,
	Accept: 'application/json',
};

export const TMDBImageOriginalUrl = 'https://image.tmdb.org/t/p/original';
export const TMDBImage500Url = 'https://image.tmdb.org/t/p/w500';
export const TMDBImage200Url = 'https://image.tmdb.org/t/p/w200';
export const TMDBImage780Url = 'https://image.tmdb.org/t/p/w780';
