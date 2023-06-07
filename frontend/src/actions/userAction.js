import backend from "../helpers/axios";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstant";

// LOGIN USER
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await backend.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: "Invalid Email or Password" });
  }
};

// REGISTER USER
export const register = (name, email, password, avatar) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { header: { "Content-Type": "multipart/form-data" } };

    const { data } = await backend.post(
      `api/v1/register`,
      { name, email, password, avatar },
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// LOAD USER
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await backend.get(`/api/v1/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

// LOGOUT USER
export const logout = () => async (dispatch) => {
  try {
    await backend.get(`/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// UPDATE PROFILE
export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = { header: { "Content-Type": "multipart/form-data" } };

    const { data } = await backend.put(
      `/api/v1/me/update`,
      { name, email, avatar },
      config
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE PASSWORD
export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      const config = { header: { "Content-Type": "application/json" } };

      const { data } = await backend.put(
        `/api/v1/password/change`,
        { oldPassword, newPassword, confirmPassword },
        config
      );

      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await backend.post(
      `/api/v1/password/forgot`,
      { email },
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// RESET PASSWORD
export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await backend.put(
        `/api/v1/password/reset/${token}`,
        { password, confirmPassword },
        config
      );

      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });
    const { data } = await backend.get(`/api/v1/admin/users`);

    dispatch({ type: ALL_USER_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USER_FAIL, payload: error.response.data.message });
  }
};

// Get User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await backend.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser =
  (
    id, //name, email,
    role
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
      const config = { header: { "Content-Type": "application/json" } };

      const { data } = await backend.put(
        `/api/v1/admin/user/${id}`,
        {
          // name,
          // email,
          role,
        },
        config
      );

      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await backend.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// CLEAR  ERROR
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
