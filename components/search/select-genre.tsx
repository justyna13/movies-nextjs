import { memo } from 'react';

import { TGenres } from '@/types/tmdb-types';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type TProps = {
	currentGenre: TGenres;
	defaultGenreId: string;
	select: (selectedValue: string) => void;
};

export default memo(function SelectGenre({
	currentGenre,
	defaultGenreId,
	select,
}: TProps) {
	return (
		<Select
			onValueChange={selectedValue =>
				selectedValue !== 'all' ? select(selectedValue) : select('')
			}
			value={defaultGenreId}
		>
			<SelectTrigger>
				<SelectValue placeholder="Genre" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem key={'all'} value="all">
					All
				</SelectItem>
				{currentGenre.genres.map(genre => (
					<SelectItem key={genre.id} value={String(genre.id)}>
						{genre.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
});
