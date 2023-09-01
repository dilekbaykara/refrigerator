import type { NextApiRequest, NextApiResponse } from "next";
import { Client, Value } from "ts-postgres";

type RequestData = {
  name: string;
  description: string;
  category: string;
};

type ResponseData =
  | {
      ingredient: Value[];
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { name, description, category }: RequestData = req.body;

    const client = new Client({
      database: "Refrigerator",
      user: "postgres",
      password: "postgres",
      host: "localhost",
    });

    await client.connect();

    const ingredients = await client.query(
      `INSERT INTO public."Ingredients" (name, description, category)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, description, category]
    );

    res.status(200).json({
      ingredient: ingredients.rows[0],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
