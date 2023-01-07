import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoMailUnreadOutline, IoChatbubblesOutline } from "react-icons/io5";
import { MdInbox, MdBlock } from "react-icons/md";
import { BsFillBookmarkDashFill, BsFillTrashFill } from "react-icons/bs";
import { useRef } from "react";
import { useEffect } from "react";

const SideBar = (props) => {
  useEffect(() => {}, []);
  return (
    <div className=" w-20 h-auto SideBar">
      <Navbar className="d-flex flex-column" expand="lg">
        <Nav className="w-100 d-flex flex-column gap-3 mt-5 text-none">
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
      </Navbar>
    </div>
  );
};

export default SideBar;
