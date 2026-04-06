import { neon } from "@neondatabase/serverless";

export default defineEventHandler(async () => {
  const sql = neon(process.env.DATABASE_URL!);
  const pinnedMountsResponse = await sql`SELECT * FROM pinned_mounts`;
  return pinnedMountsResponse;
});
