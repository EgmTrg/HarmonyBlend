import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

function createDb(): Db {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.local.example to .env.local and fill it in."
    );
  }
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

let cached: Db | undefined;

// Lazy singleton: the connection is only opened (and DATABASE_URL only
// required) on the first actual query, not at module import time. This lets
// pages that merely import `@/auth` (which imports this module) build even
// before DATABASE_URL is configured.
export const db: Db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    if (!cached) cached = createDb();
    return Reflect.get(cached as object, prop, receiver);
  },
});
