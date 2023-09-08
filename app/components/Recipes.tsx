import React from "react";
import { Value } from "ts-postgres";

interface RecipeProps {
  row: Value[];
}

export function Recipes(props: RecipeProps) {
  return (
    <div>
      {props.row[0]?.toString()} <p>{props.row[1]?.toString()}</p>
      <p>{props.row[2]?.toString()}</p>
    </div>
  );
}
