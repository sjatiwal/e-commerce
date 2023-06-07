import React, { useState, useEffect } from "react";
import { clearErrors, resetPassword } from "../../actions/userAction";
import Loader from "../layout/loader/loader";
import MetaData from "../layout/metaData";
import { RiLock2Fill, RiKeyLine } from "react-icons/ri";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./resetPassword.css";

function ResetPassword() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { token } = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password Updated Successfully");

      history("/login");
    }
  }, [dispatch, error, alert, history, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password -- ECOMMERCE" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2>Change Password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
                autoComplete="off"
              >
                <div className="changePassword">
                  <RiKeyLine />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="changePassword">
                  <RiLock2Fill />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="resetPasswordBtn"
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

export default ResetPassword;
