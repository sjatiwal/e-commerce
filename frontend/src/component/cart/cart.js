import React from "react";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import CartItemCard from "./cartItemCard";
import { Link } from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./cart.css";

function Cart() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;

    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    history("/login?redirect=shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <MdRemoveShoppingCart />
          <div>EMPTY CART</div>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <div className="cartPage">
          <div className="cartHeader">
            <div>Product</div>
            <div>Quantity</div>
            <div>Sub-total</div>
          </div>
          {cartItems &&
            cartItems.map((item) => (
              <div className="cartContainer" key={item.product}>
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                <div className="cartInput">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.product, item.quantity)
                    }
                  >
                    -
                  </button>
                  <input readOnly value={item.quantity} type="number" />
                  <button
                    onClick={() =>
                      increaseQuantity(item.product, item.quantity, item.stock)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="cartSubtotal">{`₹${
                  item.price * item.quantity
                }`}</div>
              </div>
            ))}

          <div className="cartGrossTotal">
            <div></div>
            <div className="cartGrossTotalBox">
              <div>Gross Total</div>
              <div>{`₹${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</div>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button onClick={checkOutHandler}>Check Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
