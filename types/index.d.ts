declare module 'next-auth' {
	import { DefaultSession } from '@auth/core/types';

	interface Session {
		user: {
			id: string;
		} & DefaultSession['user'];
	}
	interface User {
		id: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
	}
}
