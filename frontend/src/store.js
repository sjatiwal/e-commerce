import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  deleteUpdateProductReducer,
  productReviewReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  users: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: deleteUpdateProductReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewReducer,
  reviews: reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippinInfo")
      ? JSON.parse(localStorage.getItem("shippinInfo"))
      : {},
  },
};

const middleWare = [thunk];
const store = configureStore(
  { reducer: reducers },
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
