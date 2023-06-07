import React, { useEffect } from "react";
import { clearError, getProduct } from "../../../actions/productAction";
import Loader from "../../layout/loader/loader";
import MetaData from "../../layout/metaData";
import Product from "./product";
import { RiMouseFill } from "react-icons/ri";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";

import "./home.css";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Ecommerce" />
          <div className="banner">
            <div>Welcome to Ecommerce </div>
            <h1>LOOK VARIOUS PRODUCT HERE</h1>
            <a href="#container">
              <button>
                Scroll <RiMouseFill />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product product={product} key={product.name} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
