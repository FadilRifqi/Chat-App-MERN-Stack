import React from "react";
import NavigationBar from "../components/NavigationBar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
