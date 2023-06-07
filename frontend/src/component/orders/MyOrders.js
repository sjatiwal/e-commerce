import React, { useEffect } from "react";

import { clearError, myOrders } from "../../actions/orderAction";
import Component from "../../helpers/component";
//import { DataGrid } from "@material-ui/data-grid";
import LaunchIcon from "@material-ui/icons/Launch";
import Loader from "../layout/loader/loader";
// import { Link } from "react-router-dom";
import MetaData from "../layout/metaData";
import Table from "../../helpers/table";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";

import "./myOrders.css";

function MyOrders() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.users);

  // const columns = [
  //   {
  //     field: "id",
  //     headerName: "Order ID",
  //     minWidth: 400,
  //     flex: 1,
  //   },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     minWidth: 200,
  //     flex: 1,

  //     cellClassName: (params) => {
  //       return params.getValue(params.id, "status") === "Delivered"
  //         ? "greenColor"
  //         : "redColor";
  //     },
  //   },
  //   {
  //     field: "itemsQty",
  //     headerName: "Items Qty",
  //     type: "number",
  //     minWidth: 200,
  //     flex: 1,
  //   },
  //   {
  //     field: "amount",
  //     headerName: "Amount",
  //     type: "number",
  //     minWidth: 200,
  //     flex: 1,
  //   },
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     minWidth: 200,
  //     flex: 1,

  //     type: "number",
  //     sortable: false,
  //     renderCell: (params) => {
  //       return (
  //         <Link to={`/order/${params.getValue(params.id, "id")}`}>
  //           <LaunchIcon />
  //         </Link>
  //       );
  //     },
  //   },
  // ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.paymentInfo.totalPrice,
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
      icon: <LaunchIcon />,
    },
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError);
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title={`${user.name}'s - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          {/* <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          /> */}
          {orders && (
            <Table header={header} rows={rows} icons={icons} path="/order/" />
          )}
        </div>
      )}
    </>
  );
}

export default MyOrders;
