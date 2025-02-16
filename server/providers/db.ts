import { drizzle } from 'drizzle-orm/neon-http';

import * as dbSchema from '../db/schemas';

export const db = drizzle(process.env.POSTGRES_URL!, { schema: dbSchema });
