import React from "react";
import NavigationBar from "../components/NavigationBar";
import SideBar from "../components/SideBar";

const Layout = ({ children }) => {
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
