import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { hash } from '@node-rs/argon2';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = mysql.createPool(env.DATABASE_URL);

export const db = drizzle(client, { schema, mode: 'default' });

async function main() {
    let admins = await db.select().from(schema.user).where(eq(schema.user.role, "admin")).limit(1);
    if (admins.toString() != "") return;
    const adminPassword = "password"
    const adminPasswordHashed = await hash(adminPassword, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });
    const adminUser: typeof schema.user.$inferInsert = {
        username: 'admin',
        passwordHash: adminPasswordHashed,
        role: 'admin',
    };
    await db.insert(schema.user).values(adminUser);
}

main();