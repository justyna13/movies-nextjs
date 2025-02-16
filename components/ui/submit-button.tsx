'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';

type TProps = {
	text: string;
};

export default function SubmitButton({ text }: TProps) {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" className="relative w-full">
			{text}
			{pending ? <Loader className="absolute right-2.5 top-2.5" /> : ''}
		</Button>
	);
}
