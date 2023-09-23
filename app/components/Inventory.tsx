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
      <div className="inventory-div">
        <div className="inventory-info">
          {/* ID
          {props.row[0]?.toString()}{" "} */}
          <p className="inventory-p">
            Ingredient: {ingredient?.[1]?.toString()}
            <br></br>
            Quantity:
            <input value={props.row[4]?.toString()} type="number"></input>
            <br></br>
            Purchase Date:
            <input
              value={removeTimestamp(props.row[5]?.toString())}
              type="date"
            ></input>
            <br></br>
            Expiration Date:
            <input
              value={removeTimestamp(props.row[2]?.toString())}
              type="date"
            ></input>
            <br></br>
            Location:
            {props.row[3]?.toString()}
            <br></br>
          </p>
          <div className="inventory-button-div">
            <button className="inventory-btn" onClick={() => {}}>
              Save
            </button>
            <button className="inventory-btn" onClick={toggleEdit}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
    //place form inside div above
  }
  return (
    <div className="inventory-div">
      <div className="inventory-info">
        {/* ID
        {props.row[0]?.toString()}{" "} */}
        <p className="inventory-p">
          Ingredient: {ingredient?.[1]?.toString()}
          <br></br>
          Quantity:
          {props.row[4]?.toString()}
          <br></br>
          Purchase Date:
          {props.row[5]?.toString()}
          <br></br>
          Expiration Date:
          {props.row[2]?.toString()}
          <br></br>
          Location:
          {props.row[3]?.toString()}
          <br></br>
        </p>
        <div className="inventory-button-div">
          <button className="inventory-btn" onClick={toggleEdit}>
            Edit
          </button>
          <button className="inventory-btn" onClick={props.delete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
