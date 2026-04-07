import { neon } from "@neondatabase/serverless";
import { auth } from "../lib/auth";

export default defineEventHandler(async (event) => {
  const sql = neon(process.env.DATABASE_URL!);
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  const requestBody = await readBody(event);

  console.log(requestBody);

  const pinMount = await sql`
  INSERT INTO pinned_mounts ("mountName", "mountId", "mountIcon", "userId")
  VALUES (${requestBody.mountName}, ${requestBody.mountId}, ${requestBody.mountIcon}, ${requestBody.userId})`;

  return pinMount;
});
