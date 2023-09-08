"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { Ingredient } from "./components/Ingredient";
import { Inventory } from "./components/Inventory";
import { Recipes } from "./components/Recipes";

import styles from "./page.module.css";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [ingredient, setIngredient] = useState<string>("");

  const [inventory, setInventory] = useState<string>("");
  const [inventoryIngredient, setInventoryIngredient] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [expiration, setExpiration] = useState<string>("");
  const [inventoryLocation, setInventoryLocation] = useState<string>("");

  const [recipe, setRecipe] = useState<string>("");

  const handleIngredientChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredient(event.target.value);
  };

  const handleInventoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInventory(event.target.value);
  };
  const handleExpirationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpiration(event.target.value);
  };
  const handleInventoryIngredientChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInventoryIngredient(parseInt(event.target.value));
  };

  const handleRecipeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipe(event.target.value);
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
    console.log("ingredient", ingredient);
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
    fetchData();
  }

  function addInventory() {
    console.log("inventory", inventory);
    const fetchData = async () => {
      console.log(
        JSON.stringify({
          ingredient: inventoryIngredient,
          quantity: quantity,
          expiration: expiration,
          location: inventoryLocation,
        })
      );
      const response = await fetch("/api/create-inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredient: inventoryIngredient,
          quantity: quantity,
          expiration: expiration,
          location: inventoryLocation,
        }), // Convert inventory to JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData({
        ...data,
        inventory: [...data.inventory, result.inventory],
      });
    };
    fetchData();
  }

  function addRecipe() {
    console.log("recipes", recipe);
    const fetchData = async () => {
      const response = await fetch("/api/create-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: recipe,
          description: "",
          category: "",
        }), // Convert recipe to JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData({
        ...data,
        recipe: [...data.recipes, result.recipes],
      });
    };
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
      <input value={inventory} onChange={handleInventoryChange} />
      Choose Inventory
      <select
        value={inventoryIngredient}
        onChange={handleInventoryIngredientChange}
      >
        <option value="">--Please choose an option--</option>
        {data.ingredients.map((row: any) => (
          <option value={row[0]} key={row[0]?.toString()}>
            {row[1]}
          </option>
        ))}
      </select>
      <button onClick={addInventory}>Add Inventory</button>
      <input type="date" value={expiration} onChange={handleExpirationChange} />
      <div>
        {data.inventory.map((row: any) => (
          <Inventory
            ingredients={data.ingredients}
            row={row}
            key={row[0]?.toString()}
          />
        ))}
      </div>
      <input value={recipe} onChange={handleRecipeChange} />
      <button onClick={addRecipe}>Add Recipe</button>
      <div>
        {data.inventory.map((row: any) => (
          <Recipes row={row} key={row[0]?.toString()} />
        ))}
      </div>
      <div>{JSON.stringify(data.ingredients)}</div>
      <div>{JSON.stringify(data.inventory)}</div>
      <div>{JSON.stringify(data.recipeIngredients)}</div>
      <div>{JSON.stringify(data.recipes)}</div>
    </main>
  );
}
