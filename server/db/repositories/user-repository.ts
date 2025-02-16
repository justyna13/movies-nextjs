import { usersTable } from '@/server/db/schemas';
import { db } from '@/server/providers/db';
import { TUserRegistrationValidator } from '@/validators/user-validator';
import { eq, or } from 'drizzle-orm';

const UserRepository = {
	async firstByEmail(email: string) {
		return db.query.usersTable.findFirst({
			where: eq(usersTable.email, email),
		});
	},
	async firstByName(name: string) {
		return db.query.usersTable.findFirst({
			where: eq(usersTable.name, name),
		});
	},
	async firstById(id: string) {
		return db.query.usersTable.findFirst({
			where: eq(usersTable.id, id),
		});
	},
	async isExist(email: string, name: string) {
		const user = await db.query.usersTable.findFirst({
			where: or(eq(usersTable.email, email), eq(usersTable.name, name)),
		});

		return !!user;
	},
	async insert(email: string, name: string, password: string) {
		await db.insert(usersTable).values({
			name,
			email,
			password,
		});
	},
	async update(id: string, user: TUserRegistrationValidator) {
		await db.update(usersTable).set(user).where(eq(usersTable.id, id));
	},
};

export default UserRepository;
