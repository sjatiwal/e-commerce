import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Backdrop } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { logout } from "../../../actions/userAction";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import "./header.css";

function UserOptions({ user }) {
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "green" : "red" }}
        />
      ),
      name: `cart{${cartItems.length}}`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function cart() {
    history("/cart");
  }
  function dashboard() {
    history("/admin/dashboard");
  }
  function orders() {
    history("/orders");
  }
  function account() {
    history("/account");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "4" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className="speedDial"
        direction="down"
        icon={
          //   <img
          //     className="speedDialIcon"
          //     src={user.avatar.url}
          //     alt="Profile"
          //   />
          <CgProfile className="speedDialIcon" />
        }
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "5" }}
      >
        {options.map((item) => (
          <SpeedDialAction
            className="speedDialAction"
            key={item.func}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </>
  );
}

export default UserOptions;
