import {NextApiRequest, NextApiResponse} from "next";
import {sql} from "@vercel/postgres";

export default async function images(request: NextApiRequest, response: NextApiResponse) {
  const images = await sql`SELECT * FROM Images`;
  return response.status(200).json({ images });
}