import { neon } from "@neondatabase/serverless";
import { auth } from "../lib/auth";

export default defineEventHandler(async (event) => {
  const sql = neon(process.env.DATABASE_URL!);
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  console.log(session?.user.id);
  return session;
  // const pinMount = await sql`
  // INSERT INTO pinned_mounts
  // VALUES ('', '', '${session.data.user.id}',) `
});
