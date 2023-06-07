import React, { useEffect } from "react";
import Component from "../../helpers/component";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  deleteOrder,
  getAllOrders,
  clearError,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import EditIcon from "@material-ui/icons/Edit";
import MetaData from "../layout/metaData";
import Table from "../../helpers/table";
import SideBar from "./Sidebar";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./OrderList.css";

const OrderList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const history = useNavigate();
  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      history("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.paymentInfo.totalPrice,
        status: item.orderStatus,
      });
    });

  const header = [
    { name: "Order ID", data: "id" },
    {
      name: "Status",
      data: "status",
      Component,
    },
    { name: "Items Qty", data: "itemsQty" },
    { name: "Amount", data: "amount" },
  ];

  const icons = [
    {
      icon: <EditIcon />,
      button: <DeleteIcon />,
    },
  ];

  return (
    <>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="orderListContainer">
          <h1 id="orderListHeading">ALL ORDERS</h1>

          {orders && (
            <Table
              header={header}
              rows={rows}
              icons={icons}
              path="/admin/order/"
              deleteHandler={deleteOrderHandler}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OrderList;
