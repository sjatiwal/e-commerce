import React from "react";

import { Link } from "react-router-dom";

import "./cart.css";
function CartItemCard({ item, deleteCartItems }) {
  return (
    <div className="cartItemCard">
      {/* <img src={item.image} alt="No Image" /> */}
      <div></div>
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <div onClick={() => deleteCartItems(item.product)}>Remove</div>
      </div>
    </div>
  );
}

export default CartItemCard;
