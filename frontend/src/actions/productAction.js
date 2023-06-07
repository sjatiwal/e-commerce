import backend from "../helpers/axios";

import {
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstant";

// Get All Products
export const getProduct =
  (
    keyword = "",
    currentPage = 1, //price = [0, 250000],
    category,
    rating = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&rating[gte]=${rating}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}&rating[gte]=${rating}`;
      }
      const { data } = await backend.get(link);

      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Get Product for Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await backend.get("/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// New Product
export const createProduct =
  (name, price, description, category, stock) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });

      const config = {
        header: { "content-type": "application/json" },
      };

      const { data } = await backend.post(
        `/api/v1/admin/product/new`,
        { name, price, description, category, stock },
        config
      );

      dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Update Product
export const updateProduct =
  (id, name, price, description, category, stock) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });

      const config = {
        header: { "content-type": "application/json" },
      };

      const { data } = await backend.put(
        `/api/v1/admin/product/${id}`,
        { name, price, description, category, stock },
        config
      );

      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await backend.delete(`/api/v1/admin/product/${id}`);

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await backend.get(`/api/v1/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// New Review
export const newReview = (rating, comment, id) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      header: { "content-type": "application/json" },
    };

    const { data } = await backend.put(
      `/api/v1/review`,
      { rating, comment, id },
      config
    );

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Review

export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await backend.get(`/api/v1/reviews?id=${id}`);

    dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await backend.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// CLEAR ERRORS
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
