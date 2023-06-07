import React, { useEffect, useRef } from "react";

import backend from "../../helpers/axios";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  //z,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutSteps from "./CheckoutSteps";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { createOrder, clearError } from "../../actions/orderAction";
import EventIcon from "@material-ui/icons/Event";
import { RiKeyFill } from "react-icons/ri";
import MetaData from "../layout/metaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./payment.css";

function Payment() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const history = useNavigate();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.users);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disable = true;

    try {
      const { data } = await backend.post(
        `api/v1/payment/process`,
        paymentData,
        {
          headers: {
            "content-type": "application/json",
          },

          withCredentials: true,
        }
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            itemPrice: orderInfo.subtotal,
            taxPrice: orderInfo.tax,
            shippingPrice: orderInfo.shippingCharges,
            totalPrice: orderInfo.totalPrice,
          };
          dispatch(createOrder(order));
          history("/success");
        } else {
          alert.error("Payment is not completed due to some reason");
        }
      }
    } catch (error) {
      payBtn.current.disable = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />

      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />

            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <RiKeyFill />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
}

export default Payment;
