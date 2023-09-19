import type { NextApiRequest, NextApiResponse } from "next";
import { Client, Value } from "ts-postgres";

type RequestData = {
  id: number;
};

//either empty or error
type ResponseData =
  | {}
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { id }: RequestData = req.body;

    const client = new Client({
      database: "Refrigerator",
      user: "postgres",
      password: "postgres",
      host: "localhost",
    });

    await client.connect();

    await client.query(
      `DELETE FROM public."Inventory"
      WHERE id IN
          ($1)`,
      [id]
    );
    console.log("deleted", id);

    res.status(200).json({});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
