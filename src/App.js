import React, { useState } from "react";
import ListItem from "./ListItem";
import "./App.css";

export default function App() {
  const [numberOfItems, setNumberOfItems] = useState(10000);
  const [observe, setObserve] = useState(false);
  const [concurrent, setConcurrent] = useState(false);

  return (
    <div style={{ padding: "48px" }}>
      <h1>Using Intersection Observers for Rendering Large Lists</h1>
      <div style={{ marginTop: "8px" }}>
        <div style={{ display: "flex", flexDirection: "column", margin: "8px 0" }}>
          <div style={{ margin: "4px 0" }}>
            <label htmlFor="numItems">Number of Items: </label>
            <input
              type="number"
              min="0"
              id="numItems"
              onChange={(e) => setNumberOfItems(Number(e.target.value))}
              value={numberOfItems}
            />
          </div>
          <div style={{ margin: "4px 0" }}>
            <label htmlFor="observe">Turn On Intersect Observer: </label>
            <input
              type="checkbox"
              id="observe"
              onChange={() => setObserve((prev) => !prev)}
              checked={observe}
            />
          </div>
          <div style={{ margin: "4px 0" }}>
            <label htmlFor="concurrent">Turn On Concurrent Rendering: </label>
            <input
              type="checkbox"
              id="concurrent"
              onChange={() => setConcurrent((prev) => !prev)}
              checked={concurrent}
              disabled={!observe}
            />
          </div>
        </div>
        <div
          id="scrollable-list"
          style={{ height: "300px", overflow: "auto", border: "1px solid black" }}
        >
          <ul style={{ margin: 0, padding: 0 }}>
            {[...Array(numberOfItems)].map((_, index) => (
              <ListItem key={`item-${index}`} observe={observe} concurrent={concurrent}>{`Item ${
                index + 1
              }`}</ListItem>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
