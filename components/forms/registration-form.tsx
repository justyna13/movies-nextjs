'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Slugs } from '@/constants/slugs';
import { registerUser } from '@/server/actions/user-actions';
import { useToast } from '@/utils/hooks/use-toast';
import { TRegistrationValidationErrors } from '@/validators/user-validator';
import { signIn } from 'next-auth/react';

import Heading from '@/components/ui/heading';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '@/components/form-field';

export default function RegistrationForm() {
	const [formErrors, setFormErrors] =
		useState<TRegistrationValidationErrors>();
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

	const handleRegistration = async (formData: FormData) => {
		const res = await registerUser(formData);

		if (!res.success && res.errors) {
			setFormErrors(res.errors);
		} else {
			setFormErrors({});
		}

		toast({
			title: res.message,
			variant: res.success ? 'success' : 'destructive',
		});

		if (res.success) {
			await signIn('credentials', {
				email: formData.get('email'),
				password: formData.get('password'),
			});
		}
	};

	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<Heading tag="h1" variant="h2" className="text-center">
				Login
			</Heading>
			<form action={handleRegistration} className="space-y-1">
				<FormField
					label="User name"
					name="name"
					type="text"
					errors={formErrors?.name}
					required
				/>
				<FormField
					label="Email"
					name="email"
					type="email"
					errors={formErrors?.email}
					placeholder="mail@gmail.com"
					required
				/>
				<FormField
					label="Password"
					name="password"
					type="password"
					errors={formErrors?.password}
					placeholder="*********"
					required
				/>
				<FormField
					label="Password confirm"
					name="passwordConfirm"
					type="password"
					errors={formErrors?.passwordConfirm}
					placeholder="*********"
					required
				/>
				<SubmitButton text="Log in" />
			</form>
			<div className="mt-4 text-center text-sm text-white">
				Already have an account?{' '}
				<Link className="underline" href={Slugs.LOGIN}>
					Login
				</Link>
			</div>
		</div>
	);
}
