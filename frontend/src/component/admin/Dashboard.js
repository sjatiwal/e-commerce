import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { getAdminProduct } from "../../actions/productAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import "chart.js/auto";
import "./Dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState({ datasets: [] });

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;

  orders &&
    orders.forEach((order) => (totalAmount += order.paymentInfo.totalPrice));

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["aqua"],
        hoverBackgroundColor: ["rgb(0,0,0)"],
        data: [0, totalAmount],
      },
    ],
  };

  useEffect(() => {
    setChartData({
      labels: ["Out of Stock", "InStock"],
      datasets: [
        {
          backgroundColor: ["rgb(100,10,50)", "rgb(20,150,250)"],
          hoverBackgroundColor: ["rgb(20,150,20)", "rgb(150,10,250)"],
          data: [outOfStock, products.length - outOfStock],
        },
      ],
    });
  }, [outOfStock, products.length]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <div>
              Total Amount <br /> ₹{totalAmount}
            </div>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <div>Product </div>
              <div>{products && products.length}</div>
            </Link>
            <Link to="/admin/orders">
              <div>Orders</div>
              <div>{orders && orders.length}</div>
            </Link>
            <Link to="/admin/users">
              <div>Users</div>
              <div>{users && users.length}</div>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
