"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { Ingredient } from "./components/Ingredient";
import { Inventory } from "./components/Inventory";
import { Recipes } from "./components/Recipes";
import { Anek_Malayalam, Anybody, Unbounded } from "next/font/google";
import styles from "./page.module.css";

const anek = Anek_Malayalam({
  variable: "--font-anek",
  weight: "600",
  subsets: ["latin"],
});

const anybody = Anybody({
  variable: "--font-any",
  weight: "400",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-un",
  weight: "400",
  subsets: ["latin"],
});

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
      const response = await fetch("/api/app-data");
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
      const response = await fetch("/api/create-inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredient: inventoryIngredient,
          quantity: quantity,
          expiration: expiration,
          purchased: purchaseDate,
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

  function deleteInventory(id: number) {
    const fetchData = async () => {
      const response = await fetch("/api/delete-inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // setData({
      //   ...data,
      //   inventory: [...data.inventory, result.inventory],
      // });

      console.log(id, result);
      setData({
        ...data,
        inventory: data.inventory.filter((row: any[]) => row[0] !== id),
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
      <div></div>
      <div id="main-page" className={unbounded.variable}>
        <div id="main" className={unbounded.variable}>
          MealFridge
        </div>
        <p id="title-info" className={anybody.variable}>
          {" "}
          Your Refrigerator and Meal Plan Tracker
        </p>
        <div id="info-div">
          <p className="info-lines">~ Add Recipes</p>
          <p className="info-lines">~ Create a monthly meal plan</p>
          <p className="info-lines">
            ~ See what you have / are missing for each recipe
          </p>
          <p className="info-lines">
            ~ Track what is in your refrigerator/pantry/sock drawer
          </p>
          <p className="info-lines">
            ~ See what ingredients have expired / how many days have passed
            since purchase date
          </p>
        </div>
      </div>
      <div id="ingredients-div">
        <h1 className="title-div">Ingredients</h1>

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
      <div id="recipe-div">
        <h1 className="title-div">Recipes</h1>
        <input value={recipe} onChange={handleRecipeChange} />
        <button onClick={addRecipe}>Add Recipe</button>
      </div>
      <div></div>

      <div id="inventory-div">
        <h1 className="title-div">Inventory</h1>
        <div className="inventory-form">
          Add Inventory
          <input value={inventory} onChange={handleInventoryChange} />
          From Location
          <input value={inventoryLocation} onChange={handleLocationChange} />
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
      </div>
      <div>
        {/* {data.inventory.map((row: any) => (
      <Inventory
        ingredients={data.ingredients}
        row={row}
        key={row[0]?.toString()}
      />
    ))} */}

        <div id="inventory-track-div">
          <h1 className="title-div">Inventory Tracker</h1>
          {data.inventory.map((row: any) => (
            <Inventory
              ingredients={data.ingredients}
              row={row}
              key={row[0]?.toString()}
              delete={() => {
                console.log("delete", row[0]);
                deleteInventory(row[0]);
              }}
            />
          ))}
          <div id="data-inventory">{JSON.stringify(data.inventory)}</div>
        </div>
        <div id="do-i-have-div">
          <h1 className="title-div">Do I have enough?</h1>
        </div>
        {/* {data.inventory.map((row: any) => (
      <Recipes row={row} key={row[0]?.toString()} />
    ))} */}
      </div>
      <div>
        <h1 className="title-div">Shopping List</h1>
      </div>
      <div>
        <h1 className="title-div">Meal Planner</h1>
      </div>
      {/* <div>{JSON.stringify(data.ingredients)}</div>
      <div>{JSON.stringify(data.inventory)}</div>
      <div>{JSON.stringify(data.recipeIngredients)}</div>
      <div>{JSON.stringify(data.recipes)}</div> */}
    </main>
  );
}
