import React, { useEffect, useState } from "react";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from "@material-ui/core";
import {
  clearError,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import DescriptionIcon from "@material-ui/icons/Description";
import MetaData from "../layout/metaData";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant";
import Sidebar from "./Sidebar";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import StorageIcon from "@material-ui/icons/Storage";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./UpdateProduct.css";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();
  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  // const [images, setImages] = useState([]);
  // const [oldImages, setOldImages] = useState([]);
  // const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Laptop", "Transport", "cloths", "Mobile", "Games"];

  const { id } = useParams();

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      //setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, id, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });
    dispatch(updateProduct(id, name, price, description, category, stock));
  };

  // const updateProductImagesChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   setImages([]);
  //   setImagesPreview([]);
  //   setOldImages([]);

  //   files.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setImagesPreview((old) => [...old, reader.result]);
  //         setImages((old) => [...old, reader.result]);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };

  return (
    <>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="updateProductContainer">
          <form
            className="createUpdateProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

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
                onChange={(e) => setPrice(e.target.value)}
                value={price}
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
                <option value="">Choose Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
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

            {/* <div id="createUpdateProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div> */}

            {/* <div id="createUpdateProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div> */}

            {/* <div id="createUpdateProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div> */}

            <Button
              id="createUpdateProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
