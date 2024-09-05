import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG);

export const db = drizzle(sql);

export default db;
