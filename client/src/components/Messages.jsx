import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import {
  RiSearch2Line,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
} from "react-icons/ri";
import Users from "../api/Users";
const Messages = () => {
  const [show, setShow] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [users, setUsers] = useState(Users);
  return (
    <Container className="h-auto">
      <Form.Group>
        <InputGroup>
          <InputGroup.Text>
            <RiSearch2Line className="search-icon" />
          </InputGroup.Text>
          <Form.Control type="text" placeholder="Search here.." />
        </InputGroup>
      </Form.Group>
      <div className="my-2">
        <Button
          onClick={() => {
            setShow(!show);
            setShowAll(false);
            setShowCompanies(false);
            setShowTeam(false);
          }}
          id="dropdown-custom-components"
          className="w-100 bg-none  h-min"
        >
          <p className="d-flex flex-row justify-content-between color-purple">
            Unread Message
            {show ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
          </p>
        </Button>
        <div className={`${show ? "unread-msg-show" : "unread-msg-hidden"}`}>
          {users.map((user, i) => {
            return (
              <div className="d-flex flex-column">
                <div className=" p-3 d-flex flex-column ">
                  <div className="chat-user d-flex flex-row gap-3">
                    <img
                      src={user.img}
                      style={{ height: "50px", width: "50px" }}
                      className="profile-picture"
                    />
                    <div className="d-flex flex-row gap-1">
                      <p className="user-name">{user.name}</p>
                      <div
                        className={`${
                          user.status === "Online"
                            ? "status-online"
                            : "status-offline"
                        } mt-2`}
                      ></div>
                      <div className="last-send">{user.newMessage.time}</div>
                    </div>
                  </div>
                  <div className="unread-msg-box">
                    <p className="msg-text">
                      {user.newMessage.msg
                        ? user.newMessage.msg
                        : "Click To Start Message"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" my-2">
        <Button
          onClick={() => {
            setShowTeam(!showTeam);
            setShowAll(false);
            setShowCompanies(false);
            setShow(false);
          }}
          id="dropdown-team"
          className="w-100 bg-none h-min"
        >
          <p className="d-flex flex-row justify-content-between color-purple">
            From Team{" "}
            {showTeam ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
          </p>
        </Button>

        <div
          className={`${showTeam ? "unread-msg-show" : "unread-msg-hidden"}`}
        >
          {users.map((user, i) => {
            return (
              <div className="d-flex flex-column">
                <div className=" p-3 my-2 d-flex flex-column ">
                  <div className="chat-user d-flex flex-row gap-3">
                    <img
                      src={user.img}
                      style={{ height: "50px", width: "50px" }}
                      className="profile-picture"
                    />
                    <div className="d-flex flex-row gap-1">
                      <p className="user-name">{user.name}</p>
                      <div
                        className={`${
                          user.status === "Online"
                            ? "status-online"
                            : "status-offline"
                        } mt-2`}
                      ></div>
                      <div className="last-send">{user.newMessage.time}</div>
                    </div>
                  </div>
                  <div className="unread-msg-box">
                    <p className="msg-text">
                      {user.newMessage.msg
                        ? user.newMessage.msg
                        : "Click To Start Message"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" my-2">
        <Button
          onClick={() => {
            setShowCompanies(!showCompanies);
            setShowAll(false);
            setShow(false);
            setShowTeam(false);
          }}
          id="dropdown-team"
          className="w-100 bg-none h-min"
        >
          <p className="d-flex flex-row justify-content-between color-purple">
            From Companies{" "}
            {showCompanies ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
          </p>
        </Button>

        <div
          className={`${
            showCompanies ? "unread-msg-show" : "unread-msg-hidden"
          }`}
        >
          {users.map((user, i) => {
            return (
              <div className="d-flex flex-column">
                <div className=" p-3 my-2 d-flex flex-column ">
                  <div className="chat-user d-flex flex-row gap-3">
                    <img
                      src={user.img}
                      style={{ height: "50px", width: "50px" }}
                      className="profile-picture"
                    />
                    <div className="d-flex flex-row gap-1">
                      <p className="user-name">{user.name}</p>
                      <div
                        className={`${
                          user.status === "Online"
                            ? "status-online"
                            : "status-offline"
                        } mt-2`}
                      ></div>
                      <div className="last-send">{user.newMessage.time}</div>
                    </div>
                  </div>
                  <div className="unread-msg-box">
                    <p className="msg-text">
                      {user.newMessage.msg
                        ? user.newMessage.msg
                        : "Click To Start Message"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" my-2">
        <Button
          onClick={() => {
            setShowAll(!showAll);
            setShow(false);
            setShowCompanies(false);
            setShowTeam(false);
          }}
          id="dropdown-team"
          className="w-100 bg-none h-min"
        >
          <p className="d-flex flex-row justify-content-between color-purple">
            All Messages{" "}
            {showAll ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
          </p>
        </Button>

        <div className={`${showAll ? "unread-msg-show" : "unread-msg-hidden"}`}>
          {users.map((user, i) => {
            return (
              <div className="d-flex flex-column">
                <div className=" p-3 my-2 d-flex flex-column ">
                  <div className="chat-user d-flex flex-row gap-3">
                    <img
                      src={user.img}
                      style={{ height: "50px", width: "50px" }}
                      className="profile-picture"
                    />
                    <div className="d-flex flex-row gap-1">
                      <p className="user-name">{user.name}</p>
                      <div
                        className={`${
                          user.status === "Online"
                            ? "status-online"
                            : "status-offline"
                        } mt-2`}
                      ></div>
                      <div className="last-send">{user.newMessage.time}</div>
                    </div>
                  </div>
                  <div className="unread-msg-box">
                    <p className="msg-text">
                      {user.newMessage.msg
                        ? user.newMessage.msg
                        : "Click To Start Message"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Messages;
