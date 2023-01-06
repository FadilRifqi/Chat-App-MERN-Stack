import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import SideBar from "../components/SideBar";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="">
      <NavigationBar />
      <div className="d-flex flex-row h-auto">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
