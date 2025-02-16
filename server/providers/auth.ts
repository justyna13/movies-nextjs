import UserRepository from '@/server/db/repositories/user-repository';
import {
	accountsTable,
	sessionsTable,
	usersTable,
	verificationTokensTable,
} from '@/server/db/schemas';
import { db } from '@/server/providers/db';
import { userLoginValidator } from '@/validators/user-validator';
import Credentials from '@auth/core/providers/credentials';
import Google from '@auth/core/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';

// @ts-ignore
export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db, {
		accountsTable,
		sessionsTable,
		usersTable,
		verificationTokensTable,
	}),
	providers: [
		Google({
			allowDangerousEmailAccountLinking: true,
		}),
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async credentials => {
				try {
					const { email, password } = userLoginValidator.parse({
						email: credentials.email,
						password: credentials.password,
					});

					const user = await UserRepository.firstByEmail(email);

					if (!user || !user.password) {
						throw new Error('User not found');
					}

					const passwordMatch = await bcrypt.compare(
						password,
						user.password,
					);

					if (!passwordMatch) {
						throw new Error('Invalid credentials');
					}

					return user;
				} catch (e) {
					console.log(e);
					return null;
				}
			},
		}),
	],
	events: {
		signIn(msg: string) {
			console.log(msg);
		},
	},
	callbacks: {
		// @ts-ignore
		async jwt({ token, trigger, session, user }) {
			if (trigger === 'update' && session.email) {
				token.email = session.email;
				token.name = session.name;
			}

			if (user && user.id) {
				token.id = user.id;
			}

			return token;
		},
		// @ts-ignore
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id;
			}

			return session;
		},
	},
	pages: {
		signIn: '/login',
		signOut: '/login',
		error: '/login',
	},
	session: {
		strategy: 'jwt',
	},
});
