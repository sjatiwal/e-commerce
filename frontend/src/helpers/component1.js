import React from "react";

function component1({ data }) {
  return <div style={{ color: data > 0 ? "green" : "red" }}>{data}</div>;
}

export default component1;
