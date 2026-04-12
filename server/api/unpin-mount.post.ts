import { neon } from "@neondatabase/serverless";
import { auth } from "../lib/auth";

export default defineEventHandler(async (event) => {
  const sql = neon(process.env.DATABASE_URL!);
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  const requestBody = await readBody(event);

  const unpinMount = await sql`
  DELETE FROM pinned_mounts
  WHERE id=(${requestBody.id})`;

  return unpinMount;
});
