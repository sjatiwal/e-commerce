import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/loader/loader";
import { RiMailLine } from "react-icons/ri";
import { RiLock2Fill } from "react-icons/ri";
import { MdFaceUnlock } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import "./loginSignUp.css";

function LoginSignUp() {
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [searchParams] = useSearchParams();

  const alert = useAlert();
  const history = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    dispatch(register(name, email, password, avatar));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.file[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = searchParams ? "/shipping" : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, history, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="loginSignUpContainer">
          <div className="loginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <div onClick={(e) => switchTabs(e, "login")}>Login</div>
                <div onClick={(e) => switchTabs(e, "register")}>Registers</div>
              </div>
              <button className="switcherTab" ref={switcherTab}></button>
            </div>
            <form
              className="loginForm"
              ref={loginTab}
              onSubmit={loginSubmit}
              autoComplete="off"
            >
              <div className="loginEmail">
                <RiMailLine />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                  }}
                />
              </div>
              <div className="loginPassword">
                <RiLock2Fill />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                  }}
                />
              </div>
              <Link to="/password/forgot">Forgot Password ?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>

            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
              autoComplete="off"
            >
              <div className="signUpName">
                <MdFaceUnlock />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <RiMailLine />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <RiLock2Fill />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>
              <div id="registerImage">
                {/* <img src={avatarPreview} alt="Avatar Preview" /> */}
                <CgProfile />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input
                type="submit"
                value="Register"
                className="signUpBtn"
                disabled={loading ? true : false}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginSignUp;
