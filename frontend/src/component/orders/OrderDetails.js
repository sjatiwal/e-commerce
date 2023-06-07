import React, { useEffect } from "react";
import { clearError, getOrderDetails } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import Loader from "../layout/loader/loader";
import MetaData from "../layout/metaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./orderDetails.css";

function OrderDetails() {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError);
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <div>Name:</div>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <div>Phone No:</div>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <div>Address:</div>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.pinCode},${order.shippingInfo.state},${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>

              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div
                  className={
                    order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </div>
                <div>
                  <div>Amount:</div>

                  <span>
                    {order.paymentInfo && order.paymentInfo.totalPrice}
                  </span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <div
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </div>
                </div>
              </div>
            </div>
            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => {
                    return (
                      <div key={item.product}>
                        <div className="img"></div>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <span>
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OrderDetails;
