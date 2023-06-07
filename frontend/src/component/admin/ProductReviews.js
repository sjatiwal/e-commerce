import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import {
  clearError,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_REVIEW_RESET } from "../../constants/productConstant";
import MetaData from "../layout/metaData";
import SideBar from "./Sidebar";
import Star from "@material-ui/icons/Star";
import Table from "../../helpers/table";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./ProductReviews.css";
const ProductReviews = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const history = useNavigate();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.reviews
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      history("/admin/review");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted, productId]);

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  const header = [
    { name: "Review ID", data: "id" },
    {
      name: "User",
      data: "user",
    },
    { name: "Comment", data: "comment" },
    {
      name: "Rating",
      data: "rating",
    },
  ];

  const icons = [
    {
      button: <DeleteIcon />,
    },
  ];

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <div className="reviewListTable">
              <Table
                header={header}
                rows={rows}
                icons={icons}
                deleteHandler={deleteReviewHandler}
              />
            </div>
          ) : productId === "" ? (
            <h1 className="productNotFoundHeading">
              Please Enter the Product Id
            </h1>
          ) : (
            <h1 className="productNotFoundHeading">No Review Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
