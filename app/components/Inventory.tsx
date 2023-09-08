import React from "react";
import { Value } from "ts-postgres";

interface InventoryProps {
  row: Value[];
  ingredients: Value[][];
}

export function Inventory(props: InventoryProps) {
  const ingredient = props.ingredients.find((row) => row[0] === props.row[1]);
  console.log(props.row, props.ingredients);
  return (
    <div>
      ID
      {props.row[0]?.toString()}{" "}
      <p>
        {props.row[2]?.toString()}
        Ingredient {ingredient?.[1]?.toString()}
      </p>
    </div>
  );
}
