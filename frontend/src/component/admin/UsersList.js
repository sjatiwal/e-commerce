import React, { useEffect } from "react";
import Component from "../../helpers/component";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_USER_RESET } from "../../constants/userConstant";
import EditIcon from "@material-ui/icons/Edit";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/metaData";
import SideBar from "./Sidebar";
import Table from "../../helpers/table";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";

import "./ProductList.css";

const UsersList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const history = useNavigate();
  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      history("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  const header = [
    { name: "User ID", data: "id" },
    {
      name: "Email",
      data: "email",
    },
    { name: "Name", data: "name" },
    {
      name: "Role",
      data: "role",
      Component,
    },
  ];

  const icons = [
    {
      icon: <EditIcon />,
      button: <DeleteIcon />,
    },
  ];
  return (
    <>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          {users && (
            <Table
              header={header}
              rows={rows}
              icons={icons}
              path="/admin/user/"
              deleteHandler={deleteUserHandler}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UsersList;
