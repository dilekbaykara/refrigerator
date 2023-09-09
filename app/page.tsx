"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { Ingredient } from "./components/Ingredient";
import { Inventory } from "./components/Inventory";
import { Recipes } from "./components/Recipes";
import Head from "next/head";

import styles from "./page.module.css";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [ingredient, setIngredient] = useState<string>("");

  const [inventory, setInventory] = useState<string>("");
  const [inventoryIngredient, setInventoryIngredient] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [expiration, setExpiration] = useState<string>("");
  const [purchaseDate, setPurchaseDate] = useState<string>("");
  const [inventoryLocation, setInventoryLocation] = useState<string>("");

  const [recipe, setRecipe] = useState<string>("");

  const handleIngredientChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredient(event.target.value);
  };

  const handleInventoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInventory(event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInventoryLocation(event.target.value);
  };

  const handleExpirationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpiration(event.target.value);
  };

  const handlePurchaseChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPurchaseDate(event.target.value);
  };

  const handleInventoryIngredientChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInventoryIngredient(parseInt(event.target.value));
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value));
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
      <div>
        <Head>
          <link
            rel="stylesheet"
            href="https://use.typekit.net/vbh5hkq.css"
          ></link>
        </Head>
      </div>
      <div id="main-page">
        <h1>MealFridge</h1>
        <h3> Your Refrigerator and Meal Plan Tracker</h3>
        <h3>Add Recipes</h3>
        <h3>Create a montly meal plan</h3>
        <h3>See what you have / are missing for each recipe</h3>
        <h3>Track what is in your refrigerator/pantry/sock drawer</h3>
        <h3>
          See what ingredients have expired / how many days have passed since
          purchase date
        </h3>
      </div>
      <div id="ingredients-div">
        <div id="quantity">
          Quantity
          <input value={quantity} onChange={handleQuantityChange} />
        </div>
        <div id="ingredient">
          Ingredient
          <input value={ingredient} onChange={handleIngredientChange} />
          <button onClick={addIngredient}>Add Ingredient</button>
        </div>
        <br></br>
        <div>
          {/* {data.ingredients.map((row: any) => (
            <Ingredient row={row} key={row[0]?.toString()} />
          ))} */}
        </div>
      </div>
      <div id="inventory-div">
        <h1>Inventory</h1>
        <div id="inventory-div-2">
          Add Inventory
          <input value={inventory} onChange={handleInventoryChange} />
          From Location
          <input value={inventoryLocation} onChange={handleLocationChange} />
        </div>
        <div id="quantity">
          Quantity
          <input value={quantity} onChange={handleQuantityChange} />
        </div>
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
        Expiration Date
        <input
          type="date"
          value={expiration}
          onChange={handleExpirationChange}
        />
        Date Purchased
        <input
          type="date"
          value={purchaseDate}
          onChange={handlePurchaseChange}
        />
        <button onClick={addInventory}>Add Inventory</button>
      </div>
      <div>
        {/* {data.inventory.map((row: any) => (
          <Inventory
            ingredients={data.ingredients}
            row={row}
            key={row[0]?.toString()}
          />
        ))} */}
      </div>
      <div id="recipe-div">
        <input value={recipe} onChange={handleRecipeChange} />
        <button onClick={addRecipe}>Add Recipe</button>
      </div>
      <div>
        {/* {data.inventory.map((row: any) => (
          <Recipes row={row} key={row[0]?.toString()} />
        ))} */}
      </div>
      <div>{JSON.stringify(data.ingredients)}</div>
      <div>{JSON.stringify(data.inventory)}</div>
      <div>{JSON.stringify(data.recipeIngredients)}</div>
      <div>{JSON.stringify(data.recipes)}</div>
    </main>
  );
}
