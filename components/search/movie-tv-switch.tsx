import { TMediaTypes } from '@/types/types';
import { Switch } from '@/components/ui/switch';

type TProps = {
	type: TMediaTypes;
	checkedChange: () => void;
};

export default function MovieTVSwitch({ type, checkedChange }: TProps) {
	return (
		<div className="mb-7 flex gap-3 text-white">
			<div>Series</div>
			<Switch
				checked={type === 'movie'}
				onCheckedChange={checkedChange}
			/>
			<div>Movies</div>
		</div>
	);
}
