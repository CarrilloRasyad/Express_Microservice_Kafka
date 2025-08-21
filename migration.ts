// import 'dotenv/config';  
import { Pool } from "pg";
import { DB_URL } from "./src/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";


async function runMigration() {
    try {
        console.log("Migration start...");
        const pool = new Pool({ connectionString: DB_URL})
        const db = drizzle(pool);
        await migrate(db, { migrationsFolder: "./src/db/migrations" });
        console.log("migrations was successfull!");
        pool.end();
    } catch (err) {
        console.log("migration error", err);
    }
}

runMigration();