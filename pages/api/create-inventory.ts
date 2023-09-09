import type { NextApiRequest, NextApiResponse } from "next";
import { Client, Value } from "ts-postgres";

type RequestData = {
  ingredient: number;
  quantity: number;
  expiration: string;
  location: string;
  purchased: string;
};

type ResponseData =
  | {
      inventory: Value[];
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const {
      ingredient,
      quantity,
      expiration,
      location,
      purchased,
    }: RequestData = req.body;

    const client = new Client({
      database: "Refrigerator",
      user: "postgres",
      password: "postgres",
      host: "localhost",
    });

    await client.connect();

    const inventory = await client.query(
      `INSERT INTO public."Inventory" (ingredient_id, quantity, expiration_date, location, date_purchased)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        ingredient,
        quantity,
        new Date(expiration),
        location,
        new Date(purchased),
      ]
    );

    //update inventory where id is the previous ID to set the expiration date

    res.status(200).json({
      inventory: inventory.rows[0],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
