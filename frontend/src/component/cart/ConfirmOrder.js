import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { Link } from "react-router-dom";
import MetaData from "../layout/metaData";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css";

function ConfirmOrder() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.users);

  const history = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 100;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <div className="tag">Name:</div>
                <span>{user.name}</span>
              </div>
              <div>
                <div className="tag">Phone:</div>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <div className="tag">Address:</div>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    {/* <img src={item.image} alt="Product" /> */}
                    <div className="img"></div>
                    <Link to={`product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <div>Subtotal:</div>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <div>Shipping Charges:</div>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <div>GST:</div>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <div>
                <b>Total:</b>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmOrder;
