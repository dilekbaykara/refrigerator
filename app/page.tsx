"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { Ingredient } from "./components/ingredient";
import styles from "./page.module.css";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [ingredient, setIngredient] = useState<string>("");

  const handleIngredientChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredient(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/hello");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    };

    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  function addIngredient() {
    console.log("ingredient");
    const fetchData = async () => {
      const response = await fetch("/api/create-ingredient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: ingredient,
          description: "",
          category: "",
        }), // Convert ingredient to JSON
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData({
        ...data,
        ingredients: [...data.ingredients, result.ingredient],
      });
    };

    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }

  if (!data) {
    return <p>...Loading</p>;
  }

  return (
    <main className={styles.main}>
      <input value={ingredient} onChange={handleIngredientChange} />
      <button onClick={addIngredient}>Add Ingredient</button>
      <div>
        {data.ingredients.map((row: any) => (
          <Ingredient row={row} key={row[0]?.toString()} />
        ))}
      </div>
      <div>{JSON.stringify(data.ingredients)}</div>
      <div>{JSON.stringify(data.inventory)}</div>
      <div>{JSON.stringify(data.recipeIngredients)}</div>
      <div>{JSON.stringify(data.recipes)}</div>
    </main>
  );
}
