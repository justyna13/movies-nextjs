import { memo } from 'react';

import { TCountry } from '@/types/tmdb-types';
import Combobox from '@/components/ui/combobox';

type TProps = {
	countries: TCountry[];
	placeholder: string;
	defaultCountry: string;
	select: (selectedValue: string) => void;
};

export default memo(function SelectCountry({
	countries,
	placeholder,
	defaultCountry,
	select,
}: TProps) {
	const data = countries.map(country => ({
		label: country.native_name,
		value: country.iso_3166_1,
	}));

	const defaultOption = {
		label: 'All',
		value: 'all',
	};
	return (
		<Combobox
			placeholder={placeholder}
			searchText={'Search'}
			notFoundText={'Not found'}
			defaultValue={defaultCountry}
			select={select}
			data={[defaultOption, ...data]}
		/>
	);
});
