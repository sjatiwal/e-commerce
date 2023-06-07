import React, { useEffect, useState } from "react";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../layout/loader/loader";
import MetaData from "../layout/metaData";
import Pagination from "react-js-pagination";
import ProductCard from "../pages/home/product";
import Slider from "@material-ui/core/slider";
import Typography from "@material-ui/core/typography";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./products.css";

function Products() {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const alert = useAlert();

  const {
    products,
    loading,
    error,
    // productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  //const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  // const priceHandler = (event, newPrice) => {
  //   setPrice(newPrice);
  // };

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(
      getProduct(
        keyword,
        currentPage, // price,
        category,
        rating
      )
    );
  }, [
    dispatch,
    keyword,
    currentPage, //price,
    category,
    rating,
    alert,
    error,
  ]);

  const categories = ["Laptop", "Transport", "cloths", "Games", "Mobile"];
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          {filteredProductsCount > 0 ? (
            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          ) : (
            <div className="noProduct">No Product Found</div>
          )}

          <div className="filterBox">
            {/* <Typography>Price</Typography>

            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={250000}
            /> */}

            <Typography>Categories</Typography>
            <ul className="categoruBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={rating}
                valueLabelDisplay="auto"
                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < filteredProductsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={filteredProductsCount | 0}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageitemActive"
                activeLinkClass="pageLinkActive"
                pageCount="Required"
                pageRangeDisplayed={2}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Products;
