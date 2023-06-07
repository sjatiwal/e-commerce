import React, { useEffect } from "react";

import {
  clearError,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import Component from "../../helpers/component";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import MetaData from "../layout/metaData";
import Sidebar from "./Sidebar";
import Table from "../../helpers/table";
import { useAlert } from "react-alert";
//import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//import "./ProductList.css";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";

function ProductList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  //const history = useNavigate();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError);
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError);
    }
    if (isDeleted) {
      alert.success("Product Deleted successfully");
      // history("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [
    dispatch,
    error,
    alert,
    deleteError, //history,
    isDeleted,
  ]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const rows = [];

  products &&
    products.forEach((item) => {
      return rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  const header = [
    { name: "Product Id", data: "id" },
    { name: "Name", data: "name" },
    { name: "Stock", data: "stock", Component },
    { name: "Price", data: "price" },
  ];

  const icons = [
    {
      icon: <EditIcon />,
      button: <DeleteIcon />,
    },
  ];

  return (
    <>
      <MetaData title={"ALL PRODUCTS - ADMIN"} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContianer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          {products && (
            <Table
              header={header}
              rows={rows}
              icons={icons}
              path="/admin/product/"
              deleteHandler={deleteProductHandler}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProductList;
