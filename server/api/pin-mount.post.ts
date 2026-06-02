import { neon } from "@neondatabase/serverless";

export default defineEventHandler(async (event) => {
  const sql = neon(process.env.DATABASE_URL!);

  const requestBody = await readBody(event);

  const pinMount = await sql`
  INSERT INTO pinned_mounts ("mountName", "mountId", "mountIcon", "userId", "itemId")
  VALUES (${requestBody.mountName}, ${requestBody.mountId}, ${requestBody.mountIcon}, ${requestBody.userId}, ${requestBody.itemId})`;

  return pinMount;
});
