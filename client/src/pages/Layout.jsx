import React, { useRef, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import SideBar from "../components/SideBar";
import { AppContext } from "../context/appContext";

const Layout = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [selected, setSelected] = useState("");
  const {
    socket,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    messages,
    setMessages,
    privateMemberMsg,
    setPrivateMemberMsg,
    rooms,
    setRooms,
    newMessages,
    setNewMessages,
  } = useContext(AppContext);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setSelected(props.selected);
    socket.emit("new-user");
  }, [user]);

  return (
    <div className="Layout">
      <NavigationBar selected={selected} setSelected={setSelected} />
      <div className="d-flex flex-row h-auto">
        <SideBar selected={selected} setSelected={setSelected} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
