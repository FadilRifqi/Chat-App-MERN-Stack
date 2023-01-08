import React, { useRef, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import SideBar from "../components/SideBar";
import { AppContext } from "../context/appContext";
import { reset } from "../features/userSlice";

const Layout = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
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
    } else {
      if (user.newUser) {
        navigate(`/edit/${user._id}`);
      }
      console.log(user);
      setSelected(props.selected);
      // socket.emit("new-user");
    }
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
