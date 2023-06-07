import React, { useState, useEffect } from "react";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import Loader from "../layout/loader/loader";

import MetaData from "../layout/metaData";
import { RiMailLine } from "react-icons/ri";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import "./forgotPassword.css";

function ForgotPassword() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password -- ECOMMERCE" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2>Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
                autoComplete="off"
              >
                <div className="updateEmail">
                  <RiMailLine />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ForgotPassword;
