import React from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { IoMailUnreadOutline, IoChatbubblesOutline } from "react-icons/io5";
import { MdInbox, MdBlock } from "react-icons/md";
import { BsFillBookmarkDashFill, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser, reset } from "../features/userSlice";
import axios from "axios";
import { useEffect } from "react";

const NavigationBar = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogOut = async () => {
    try {
      dispatch(LogoutUser());
      dispatch(reset());
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  return (
    <Navbar className="bg-img py-4" expand="lg">
      <div className="d-flex flex-row mx-3 container">
        <Navbar.Brand href="#home">Chat App</Navbar.Brand>
        <Nav className="me-auto">
          <Button variant="danger" onClick={handleLogOut}>
            Log Out
          </Button>
          <Navbar.Brand>{user && user.name}</Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-head" />
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <div className="d-hidden">
            <Nav className=" d-flex flex-column justify-content-center w-100">
              <div>
                <Link
                  to={"/pinned"}
                  onClick={() => {
                    props.setSelected("pinned");
                  }}
                  className={`list text-center d-flex flex-row justify-content-between gap-1 ${
                    props.selected === "pinned" && "list-active"
                  }`}
                >
                  <div className="d-flex flex-row gap-1 mx-4">
                    <IoMailUnreadOutline className="font-2 mt-1" /> Pinned
                  </div>
                  <div className="mx-4">5</div>
                </Link>
              </div>
              <Link
                to={"/chat"}
                onClick={() => {
                  props.setSelected("chat");
                }}
                className={`list text-center d-flex flex-row justify-content-between gap-1 ${
                  props.selected === "chat" && "list-active"
                }`}
              >
                <div className="d-flex flex-row gap-1 mx-4">
                  <IoChatbubblesOutline className="font-2 mt-1" /> Chat
                </div>
                <div className="mx-4">5</div>
              </Link>
              <Link
                onClick={() => {
                  props.setSelected("live");
                }}
                className={`list text-center d-flex flex-row justify-content-between gap-1 ${
                  props.selected === "live" && "list-active"
                }`}
              >
                <div className="d-flex flex-row gap-1 mx-4">
                  <MdInbox className="font-2 mt-1" /> Live Chat
                </div>
                <div className="mx-4">5</div>
              </Link>
              <Link
                onClick={() => {
                  props.setSelected("archieved");
                }}
                className={`list text-center d-flex flex-row justify-content-between gap-1 ${
                  props.selected === "archieved" && "list-active"
                }`}
              >
                <div className="d-flex flex-row gap-1 mx-4">
                  <BsFillBookmarkDashFill className="font-2 mt-1" /> Archieved
                </div>
                <div className="mx-4">5</div>
              </Link>
              <Link
                onClick={() => {
                  props.setSelected("blocked");
                }}
                className={`list text-center d-flex flex-row justify-content-between gap-1 ${
                  props.selected === "blocked" && "list-active"
                }`}
              >
                <div className="d-flex flex-row gap-1 mx-4">
                  <MdBlock className="font-2 mt-1" /> Blocked
                </div>
                <div className="mx-4">5</div>
              </Link>
              <Link
                onClick={() => {
                  props.setSelected("trash");
                }}
                className={`list text-center d-flex flex-row justify-content-between gap-1 ${
                  props.selected === "trash" && "list-active"
                }`}
              >
                <div className="d-flex flex-row gap-1 mx-4">
                  <BsFillTrashFill className="font-2 mt-1" /> Trash
                </div>
                <div className="mx-4">5</div>
              </Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
