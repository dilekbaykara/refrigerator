import React, { useState } from "react";
import { Value } from "ts-postgres";

interface InventoryProps {
  row: Value[];
  ingredients: Value[][];
  delete: () => void;
}

export function Inventory(props: InventoryProps) {
  const ingredient = props.ingredients.find((row) => row[0] === props.row[1]);
  console.log(props.row, props.ingredients);
  function removeTimestamp(dateString: string | undefined) {
    if (!dateString) {
      return "";
    }
    const dateWithoutTimestamp = dateString.split("T")[0];
    return dateWithoutTimestamp;
  }

  const inputDate = "2023-09-13T00:00:00.000Z";
  const dateWithoutTimestamp = removeTimestamp(inputDate);
  console.log(dateWithoutTimestamp);

  const [edit, setEdit] = useState(false);
  function toggleEdit() {
    setEdit(!edit);
  }

  if (edit === true) {
    return (
      <div>
        ID
        {props.row[0]?.toString()}{" "}
        <p>
          Expiration Date:
          <input
            value={removeTimestamp(props.row[2]?.toString())}
            type="date"
          ></input>
          <br></br>
          Ingredient: {ingredient?.[1]?.toString()}
          <br></br>
          Purchase Date:
          <input
            value={removeTimestamp(props.row[5]?.toString())}
            type="date"
          ></input>
          <br></br>
          Location:
          {props.row[3]?.toString()}
          <br></br>
          Quantity:
          <input value={props.row[4]?.toString()} type="number"></input>
          <button onClick={() => {}}>Save</button>
          <button onClick={toggleEdit}>Cancel</button>
        </p>
      </div>
    );
    //place form inside div above
  }
  return (
    <div>
      ID
      {props.row[0]?.toString()}{" "}
      <p>
        Expiration Date:
        {props.row[2]?.toString()}
        <br></br>
        Ingredient: {ingredient?.[1]?.toString()}
        <br></br>
        Purchase Date:
        {props.row[5]?.toString()}
        <br></br>
        Location:
        {props.row[3]?.toString()}
        <br></br>
        Quantity:
        {props.row[4]?.toString()}
        <button onClick={toggleEdit}>Edit</button>
        <button onClick={props.delete}>Delete</button>
      </p>
    </div>
  );
}
