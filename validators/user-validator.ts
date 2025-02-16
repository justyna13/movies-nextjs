import { inferFlattenedErrors, object, string, z } from 'zod';

export const userLoginValidator = object({
	email: string()
		.trim()
		.email({
			message: 'Invalid email',
		})
		.min(5, {
			message: 'Email must be at least 5 characters long',
		})
		.max(32, {
			message: 'Maximum number of characters is 32',
		}),
	password: string()
		.trim()
		.min(8, {
			message: 'Password must be at least 8 characters long',
		})
		.max(32, {
			message: 'Maximum number of characters is 32',
		})
		.regex(/.*[0-9].*/, {
			message: 'Password must contain at least 1 number',
		})
		.regex(/.*[!@#$%^&*].*/, {
			message:
				'Password must contain at least 1 special character: !@#$%^&*',
		}),
});

export const userSignUpValidator = userLoginValidator
	.extend({
		name: string()
			.trim()
			.min(5, {
				message: 'Name must be at least 5 characters long',
			})
			.max(32, {
				message: 'Maximum number of characters is 32',
			}),
		passwordConfirm: string().trim().optional(),
	})
	.refine(data => data.password === data.passwordConfirm, {
		message: 'Password and password confirm must be the same',
		path: ['passwordConfirm'],
	});

export type TRegistrationValidationErrors = inferFlattenedErrors<
	typeof userSignUpValidator
>['fieldErrors'];

export type TUserRegistrationValidator = z.infer<typeof userSignUpValidator>;
