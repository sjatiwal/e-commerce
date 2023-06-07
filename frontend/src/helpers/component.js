import React from "react";

function Component({ data }) {
  return (
    <div
      style={{
        color:
          data === "Delivered" || data > 0 || data === "admin"
            ? "green"
            : "red",
      }}
    >
      {data}
    </div>
  );
}

export default Component;
