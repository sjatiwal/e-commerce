import React from "react";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your order has been placed Successfully</Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
}

export default OrderSuccess;
