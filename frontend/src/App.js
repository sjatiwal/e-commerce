import React, { useEffect, useState } from "react";

import AboutUs from "./component/pages/home/aboutus";
import backend from "./helpers/axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./component/cart/cart";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import Contact from "./component/pages/home/contact.js";
import Dashboard from "./component/admin/Dashboard";
import { Elements } from "@stripe/react-stripe-js";
import Footer from "./component/layout/footer/footer";
import ForgotPassword from "./component/user/forgotPassword";
import Header from "./component/layout/header/header";
import Home from "./component/pages/home/home";
import { loadStripe } from "@stripe/stripe-js";
import { loadUser } from "./actions/userAction";
import LoginSignUp from "./component/user/loginSignUp";
import MyOrders from "./component/orders/MyOrders";
import NewProduct from "./component/admin/NewProduct";
import NotFound from "./component/pages/home/notFound";
import OrderDetails from "./component/orders/OrderDetails";
import OrderList from "./component/admin/OrderList";
import OrderSuccess from "./component/cart/OrderSuccess";
import Payment from "./component/cart/Payment";
import ProcessOrder from "./component/admin/ProcessOrder";
import Product from "./component/product/products";
import ProductDetails from "./component/product/productDetails";
import ProductList from "./component/admin/ProductList";
import ProductReviews from "./component/admin/ProductReviews";
import Profile from "./component/user/profile";
import ProtectedRoute from "./component/Route/protectedRoute";
import ResetPassword from "./component/user/resetPassword";
import Search from "./component/product/search";
import Shipping from "./component/cart/shipping";
import store from "./store";
import webfont from "webfontloader";
import UpdatePassword from "./component/user/updatePassword";
import UpdateProduct from "./component/admin/UpdateProduct";
import UpdateProfile from "./component/user/updateProfile";
import UpdateUser from "./component/admin/UpdateUser.js";
import UsersList from "./component/admin/UsersList";
import UserOptions from "./component/layout/header/userOptions";
import { useSelector } from "react-redux";

import "./App.css";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.users);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await backend.get("/api/v1/stripeapikey");

      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Robota", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  //window.addEventListener("contextmenu", (e) => e.preventDefault());

  const notUser = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/product/:id",
      element: <ProductDetails />,
    },
    {
      path: "/products",
      element: <Product />,
    },
    {
      path: "/products/:keyword",
      element: <Product />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/login",
      element: <LoginSignUp />,
    },
    {
      path: "/account",
      element: <Profile />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/about",
      element: <AboutUs />,
    },
  ];

  return (
    <Router>
      <div className="content">
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          {/* <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Product />} />
          <Route exact path="/products/:keyword" element={<Product />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/contact" element={<Contact />} /> 
          <Route exact path="/about" element={<AboutUs />} />*/}

          {notUser.map((item) => {
            return (
              <Route
                exact
                path={item.path}
                element={item.element}
                key={Math.random().toFixed(4)}
              />
            );
          })}

          <Route
            exact
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/cart" element={<Cart />} />
          <Route
            exact
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />

          {stripeApiKey && (
            <Route
              exact
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                </Elements>
              }
            />
          )}
          <Route
            exact
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProcessOrder />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/user/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUser />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/review"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductReviews />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
