import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/metaData";

import "./search.css";

function Search() {
  const [keyword, setKeyword] = useState("");
  const history = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    } else {
      history(`/products`);
    }
  };

  return (
    <>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          //  placeholder="Search a Product..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
}

export default Search;
