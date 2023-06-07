import React from "react";
import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import { Link } from "react-router-dom";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import PostAddIcon from "@material-ui/icons/PostAdd";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { TreeView, TreeItem } from "@material-ui/lab";

import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">Home</Link>
      <Link to="/admin/dashboard">
        <div>
          <DashboardIcon /> Dashboard
        </div>
      </Link>
      <div>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<PostAddIcon />}
              ></TreeItem>
            </Link>
            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />}></TreeItem>
            </Link>
          </TreeItem>
        </TreeView>
      </div>
      <Link to="/admin/orders">
        <div>
          <ListAltIcon />
          Orders
        </div>
      </Link>
      <Link to="/admin/users">
        <div>
          <PeopleIcon /> Users
        </div>
      </Link>
      <Link to="/admin/review">
        <div>
          <RateReviewIcon /> Reviews
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
