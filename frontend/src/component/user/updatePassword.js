import React, { useState, useEffect } from "react";
import { clearErrors, updatePassword } from "../../actions/userAction";
import Loader from "../layout/loader/loader";
import MetaData from "../layout/metaData";
import { RiLock2Fill, RiKeyLine, RiLockUnlockLine } from "react-icons/ri";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PASSWORD_EDIT } from "../../constants/userConstant";
import { useNavigate } from "react-router-dom";

import "./updatePassword.css";

function UpdatePassword() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");

      history("/account");
      dispatch({
        type: UPDATE_PASSWORD_EDIT,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password -- ECOMMERCE" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2>Change Password</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
                autoComplete="off"
              >
                <div className="changePassword">
                  <RiKeyLine />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    //  name="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="changePassword">
                  <RiLockUnlockLine />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    //  name="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="changePassword">
                  <RiLock2Fill />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    // name="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
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

export default UpdatePassword;
