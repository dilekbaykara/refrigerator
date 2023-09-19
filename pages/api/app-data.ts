import type { NextApiRequest, NextApiResponse } from "next";
import { Client, Value } from "ts-postgres";

type ResponseData = {
  ingredients: Value[][];
  inventory: Value[][];
  recipeIngredients: Value[][];
  recipes: Value[][];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const client = new Client({
    database: "Refrigerator",
    user: "postgres",
    password: "postgres",
    host: "localhost",
  });
  await client.connect();
  const ingredients = await client.query(`SELECT * FROM public."Ingredients"
  ORDER BY id ASC `);
  const inventory = await client.query(`SELECT * FROM public."Inventory"
  ORDER BY id ASC `);
  const recipeIngredients =
    await client.query(`SELECT * FROM public."RecipeIngredients"
  ORDER BY id ASC `);
  const recipes = await client.query(`SELECT * FROM public."Recipes"
  ORDER BY id ASC `);
  res.status(200).json({
    ingredients: ingredients.rows,
    inventory: inventory.rows,
    recipeIngredients: recipeIngredients.rows,
    recipes: recipes.rows,
  });
}
