import React, { useEffect, useState } from "react";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from "@material-ui/core";
import { clearError, createProduct } from "../../actions/productAction";
import DescriptionIcon from "@material-ui/icons/Description";
import MetaData from "../layout/metaData";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant";
import Sidebar from "./Sidebar";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import StorageIcon from "@material-ui/icons/Storage";
import { useAlert } from "react-alert";
//import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./NewProduct.css";
function NewProduct() {
  const alert = useAlert();
  const dispatch = useDispatch();
  // const history = useNavigate();
  const { error, loading, success } = useSelector((state) => state.newProduct);

  const categories = ["Laptop", "Transport", "cloths", "Mobile", "Games"];

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  //   const [images, setImages] = useState([]);
  //   const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError);
    }
    if (success) {
      alert.success("Product Created Successfully");
      // history("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [
    dispatch,
    error,
    alert, //history,
    success,
  ]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    // images.forEach((image)=>{
    //     .append("image",image)
    // })

    dispatch(createProduct(name, price, description, category, stock));
  };

  //   const createProductImagesChange = (e) => {
  //     const files = Array.from(e.target.files);
  //     setImages([]);
  //     setImagesPreview([]);

  //     files.forEach((file) => {
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         if (reader.readyState === 2) {
  //           setImagesPreview((old) => [...old, reader.result]);
  //           setImages((old) => [...old, reader.result]);
  //         }
  //       };

  //       reader.readAsDataURL(file);
  //     });
  //   };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => {
                  return (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            {/* <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={createProductImagesChange}
              />
            </div> */}
            {/* <div id="createProductFormImage">
              {imagesPreview.map((image, index) => {
                return <img key={index} src={image} alt="Avatar Preview" />;
              })}
            </div> */}
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewProduct;
