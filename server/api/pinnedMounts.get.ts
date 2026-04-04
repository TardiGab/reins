import { neon } from "@neondatabase/serverless";
import pg from "pg";

export default defineEventHandler(async () => {
  const sql = neon(process.env.DATABASE_URL!);
  const pinnedMountsResponse = await sql`SELECT * FROM pinned_mounts`;
  console.log(pinnedMountsResponse);
  return pinnedMountsResponse;
});
