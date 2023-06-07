import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import Loader from "../layout/loader/loader";
import { Link } from "react-router-dom";
import MetaData from "../layout/metaData";
import { useNavigate } from "react-router-dom";

import "./profile.css";

import { useSelector } from "react-redux";

function Profile() {
  const history = useNavigate();

  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isAuthenticated === false) {
      history("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              {/* <img src={user.avatar.url} alt={user.name}/> */}
              <CgProfile className="profileImage" />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Name</h4>
                <div>{user.name}</div>
              </div>
              <div>
                <h4>Email</h4>
                <div>{user.email}</div>
              </div>
              <div>
                <h4>Joined On</h4>
                <div>{String(user.createdAt.substr(0, 10))}</div>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
