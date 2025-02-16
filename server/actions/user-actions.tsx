'use server';

import UserRepository from '@/server/db/repositories/user-repository';
import {
	CommonError,
	getError,
	SessionError,
} from '@/server/helpers/error-helpers';
import { auth } from '@/server/providers/auth';
import { userSignUpValidator } from '@/validators/user-validator';
import bcrypt from 'bcryptjs';

export async function registerUser(formData: FormData) {
	try {
		const { email, name, password } = userSignUpValidator.parse(
			Object.fromEntries(formData),
		);

		const userExist = await UserRepository.isExist(email, name);

		if (userExist) {
			throw new CommonError('User already exists');
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await UserRepository.insert(email, name, hashedPassword);

		return {
			success: true as const,
			message: 'Registered successfully.',
		};
	} catch (error) {
		return getError(error);
	}
}

export async function getProfile() {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			throw new SessionError();
		}

		const user = await UserRepository.firstById(session.user.id);

		if (!user) {
			throw new CommonError('No user in the database.');
		}

		return {
			success: true as const,
			data: user,
		};
	} catch (error) {
		return getError(error);
	}
}
