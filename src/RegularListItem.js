import React, { useState } from "react";

export default function RegularListItem({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "50px",
        justifyContent: "center",
        listStyleType: "none",
      }}
    >
      {children}
      <button onClick={() => setExpanded((prev) => !prev)}>
        {expanded ? "Collapse" : "Expand"}
      </button>
      <div
        style={{
          height: expanded ? "25px" : 0,
          transition: "height 0.2s ease-in-out",
          overflow: "hidden",
        }}
      >
        Check it out!
      </div>
    </li>
  );
}
