import { memo } from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type TProps = {
	defaultYear: string;
	select: (selectedValue: string) => void;
};
export default memo(function SelectYear({ defaultYear, select }: TProps) {
	const startYear = 1920;
	let currentYear = new Date().getFullYear();
	const mediaYears = [];

	for (currentYear; currentYear >= startYear; currentYear--) {
		mediaYears.push(String(currentYear));
	}

	return (
		<Select
			onValueChange={selectedValue =>
				selectedValue !== 'all' ? select(selectedValue) : select('')
			}
			value={defaultYear}
		>
			<SelectTrigger>
				<SelectValue placeholder="Years of production" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem key={'all'} value="all">
					All
				</SelectItem>
				{mediaYears.map(year => (
					<SelectItem key={year} value={year}>
						{year}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
});
