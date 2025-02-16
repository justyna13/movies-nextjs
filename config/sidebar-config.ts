import { Slugs } from '@/constants/slugs';

export type TSidebarItem = {
	label: string;
	slug: (typeof Slugs)[keyof typeof Slugs];
	type?: 'logout';
};

export type TSidebarConfig = {
	main: TSidebarItem[];
	secondary: TSidebarItem[];
};

export const sidebarConfig: TSidebarConfig = {
	main: [
		{
			label: 'Favourite',
			slug: Slugs.FAVOURITES,
		},
		{
			label: 'Saved to watch later',
			slug: Slugs.WATCH_LIST,
		},
		{
			label: 'My Account',
			slug: Slugs.MY_ACCOUNT,
		},
	],
	secondary: [
		{
			label: 'Movies',
			slug: Slugs.MOVIES,
		},
		{
			label: 'TV series',
			slug: Slugs.TV_SERIES,
		},
		{
			label: 'Trending',
			slug: Slugs.TRENDING,
		},
		{
			label: 'Popular',
			slug: Slugs.POPULAR,
		},
	],
};
