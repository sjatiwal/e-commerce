import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./home.css";

function Product({ product }) {
  const options = {
    value: product.rating,
    precision: 0.5,
    size: "large",
    readOnly: true,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <div className="product"></div>
      <div className="name">{product.name}</div>
      <div className="review">
        <Rating {...options} />
        <span className="productCardSpan">
          ({`${product.numOfReviews}`} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
}

export default Product;
