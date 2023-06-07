import React, { useEffect, useState } from "react";
//import Carousel from "react-material-ui-carousel";
import { addItemsToCart } from "../../actions/cartAction";
import {
  clearError,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import Loader from "../layout/loader/loader";
import MetaData from "../layout/metaData";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";
import { Rating } from "@material-ui/lab";

import ReviewCard from "./reviewCard";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import "./productDetails.css";

const ProductDetails = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added to Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = (e) => {
    // const myForm = new FormData();
    // myForm.set("rating", rating);
    // myForm.set("comment", comment);
    // myForm.set("id", id);
    e.preventDefault();

    dispatch(newReview(rating, comment, id));
    setOpen(false);
  };

  const options = {
    value: product.rating,
    precision: 0.5,
    size: "large",
    readOnly: true,
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [alert, dispatch, error, id, reviewError, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="productDetails">
            <div>
              {/* <Carousel> */}
              {
                product._id && <div className="img"></div>
                // product.images.map((item, i) => (
                // <img
                //   className="CarouselImage"
                //   key={item.url}
                //   src={item.url}
                //   alt={`${i} Slide`}
                // />
                // ))
              }
              {/* </Carousel> */}
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <div>Product # {product._id}</div>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({`${product.numOfReviews}`} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <div>
                  Status :
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </div>
              </div>
              <div className="detailsBlock-4">
                Description : <div>{product.description}</div>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                value={+rating}
                name="rating"
                onChange={(e) => setRating(e.target.value)}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                name="reviewArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle}>Cancel</Button>
              <Button onClick={reviewSubmitHandler}>Submit</Button>
            </DialogActions>
          </Dialog>
          {product.review ? (
            <div className="reviews">
              {product.review &&
                product.review?.map((review) => {
                  return <ReviewCard review={review} key={review._id} />;
                })}
            </div>
          ) : (
            <div className="noReviews">No Review Yet</div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
