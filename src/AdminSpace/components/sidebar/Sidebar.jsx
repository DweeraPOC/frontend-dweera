import React from "react";
import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddIcon from '@mui/icons-material/Add';
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Middlewares/AuthContext";

const Sidebar = () => {
  
  function isSuperAdminLogged()
  {
    if ( localStorage.getItem('role')==="super-admin")
    { return true; }
    else {return false ; }
  }
  const nav = useNavigate();
  const auth = useAuth();
  const logout=()=>{
    auth?.Logout();
    nav(0);
   }
  return (
    <div className="sidebar">
      <div className="top">
        <NavLink to="/admin/" style={{ textDecoration: "none" }}>
          <span className="logo"> Admin Space</span>
        </NavLink>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <NavLink to="/admin/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </NavLink>
          <p className="title">LISTS</p>
          <NavLink to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </NavLink>
          <Link to="/admin/offers" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Offers</span>
            </li>
          </Link>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">ADMIN</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          {isSuperAdminLogged() ? 
          <Link to="/admin/create-admins" style={{ textDecoration: "none" }}>
          <li>
            <AddIcon className="icon" />
            <span>Create a new Admin</span>
          </li>
          </Link>
          : <></>
          }
          <a onClick={logout}>
          <li>
            <ExitToAppIcon className="icon" />
            <span> Logout</span>
          </li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
