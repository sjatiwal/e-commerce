import React from "react";
import { Link } from "react-router-dom";

import "./notFound.css";

function NotFound() {
  return (
    <div className="notFound">
      <div>Page Not Found</div>
      <div>
        <div>Visit To</div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
