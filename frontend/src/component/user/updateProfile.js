import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import Loader from "../layout/loader/loader";
import { loadUser, clearErrors, updateProfile } from "../../actions/userAction";
import { MdFaceUnlock } from "react-icons/md";
import MetaData from "../layout/metaData";
import { RiMailLine } from "react-icons/ri";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFILE_EDIT } from "../../constants/userConstant";
import { useNavigate } from "react-router-dom";

import "./updateProfile.css";

function Profile() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useNavigate();

  const { user } = useSelector((state) => state.users);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(name, email, avatar));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.file[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      history("/account");
      dispatch({
        type: UPDATE_PROFILE_EDIT,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile -- ECOMMERCE" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2>Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
                autoComplete="off"
              >
                <div className="updateName">
                  <MdFaceUnlock />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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

                <div id="updateProfileImage">
                  {/* <img src={avatarPreview} alt="Avatar Preview" /> */}
                  <CgProfile />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
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

export default Profile;
