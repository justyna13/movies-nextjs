'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Slugs } from '@/constants/slugs';
import { useToast } from '@/utils/hooks/use-toast';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '@/components/form-field';

export default function LoginForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { toast } = useToast();

	useEffect(() => {
		const error = searchParams.get('error');

		if (error) {
			toast({
				title:
					error === 'CredentialsSignin'
						? 'Entered wrong credentials'
						: 'Error, try again later',
				variant: 'destructive',
			});
			router.push(Slugs.LOGIN);
		}
	}, [searchParams, router, toast]);

	const handleGoogleSignIn = async () => {
		await signIn('google', {
			redirectTo: Slugs.BASE,
		});
	};

	const handleSignIn = async (formData: FormData) => {
		await signIn('credentials', {
			email: formData.get('email'),
			password: formData.get('password'),
			redirectTo: Slugs.BASE,
		});
	};

	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<Heading tag="h1" variant="h2" className="text-center">
				Login
			</Heading>
			<form action={handleSignIn} className="space-y-1">
				<FormField
					label="Email"
					name="email"
					type="email"
					placeholder="mail@gmail.com"
					required
				/>
				<FormField
					label="Password"
					name="password"
					type="password"
					placeholder="*********"
					required
				/>
				<SubmitButton text="Log in" />
			</form>
			<div className="mt-4 text-center text-sm text-white">
				Do not have an account{' '}
				<Link className="underline" href={Slugs.SIGN_UP}>
					Sign up
				</Link>
			</div>
			<Button
				variant={'outline'}
				className="w-full"
				onClick={handleGoogleSignIn}
			>
				Login with Google
			</Button>
		</div>
	);
}
