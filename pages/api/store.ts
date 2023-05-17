import { sql } from '@vercel/postgres';
import {NextApiRequest, NextApiResponse} from "next";

export default async function store(request: NextApiRequest, response: NextApiResponse) {
  const req = await JSON.parse(request.body)

  try {
    await sql`
      INSERT INTO images (Url, Description, Category)
      VALUES (${req.url}, ${req.description}, ${req.category});
    `;
  } catch (error) {
    return response.status(500).json({ error });
  }

  return response.status(200).json('success');
}