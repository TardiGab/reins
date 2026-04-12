import { neon } from "@neondatabase/serverless";
import { auth } from "../lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  const userID = session?.user.id;

  const sql = neon(process.env.DATABASE_URL!);
  const pinnedMountsResponse =
    await sql`SELECT * FROM pinned_mounts WHERE "userId" = ${userID}`;
  return pinnedMountsResponse;
});
