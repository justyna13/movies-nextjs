import { pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';

export const verificationTokensTable = pgTable(
	'verificationTokens',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
	},
	verificationToken => [
		{
			compositePk: primaryKey({
				columns: [
					verificationToken.identifier,
					verificationToken.token,
				],
			}),
		},
	],
);
