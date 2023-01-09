import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
const Messages = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const handleShowModal = async () => {
    setShowModal(true);
    try {
      const response = await axios.get("http://localhost:5000/users");
      const data = await response.data;
      setUsers(data);
      console.log(data);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const sendFriendRequest = async (receiver) => {
    try {
      await axios.post(`http://localhost:5000/friend/${receiver}`, {
        sender: user._id,
      });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  const getFriend = async () => {
    try {
      const response = await axios.get("http://localhost:5000/friend", {
        data: { user_id: user._id },
      });
      const data = await response.data;
      setFriends(data.data);
      console.log(data);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getFriend();
  }, []);
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
      <div className="action-container mt-3 d-flex flex-column gap-3">
        <Row>
          <Col>
            <Button className="btn-purple w-100">
              Create New Group <AiOutlinePlus />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              className="btn-white-1 w-100 border"
              onClick={handleShowModal}
            >
              Add Friend <AiOutlinePlus />
            </Button>
          </Col>
        </Row>
      </div>
      <div className="my-2 friend-container">
        {friends.map((friend, i) => {
          return (
            <div className="d-flex flex-column">
              <div
                className=" p-3 my-2 d-flex flex-column border friend-box"
                onClick={() => {
                  props.setSender(friend.name);
                }}
              >
                <div className="chat-user d-flex flex-row gap-3">
                  <img
                    src={friend.img || "/image/60111.jpg"}
                    style={{ height: "50px", width: "50px" }}
                    className="profile-picture"
                  />
                  <div className="d-flex flex-row gap-1">
                    <p className="user-name">{friend.name}</p>
                    <div
                      className={`${
                        friend.status === "Online"
                          ? "status-online"
                          : "status-offline"
                      } mt-2`}
                    ></div>
                    <div className="last-send">{friend.newMessage.time}</div>
                  </div>
                </div>
                <div className="unread-msg-box">
                  <p className="msg-text">
                    {friend.newMessage.msg
                      ? friend.newMessage.msg
                      : "Click To Start Message"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`${
          showModal ? "modal-friend-show" : "modal-friend-hide"
        } modal-cont border`}
      >
        <div
          className="close-btn"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <AiOutlineClose />
        </div>
        <Container className="mt-3 overflow-hidden">
          <Row className="my-3">
            <Col md={12} className="justify-content-center d-flex">
              <h5>Search Friend</h5>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="justify-content-center d-flex">
              <div style={{ width: "400px" }} className="border">
                <Form>
                  <Form.Group>
                    <Form.Control type="text" />
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
          <Row className="all-user-container">
            {users.map((user, i) => {
              return (
                <Col md={4}>
                  <div className="d-flex flex-column">
                    <div className=" p-3 my-2 d-flex flex-column border friend-box">
                      <div className="chat-user d-flex flex-row gap-3">
                        <img
                          src={"/image/60111.jpg"}
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
                        </div>
                      </div>
                      <div className="unread-msg-box mt-3">
                        <Button
                          className="btn-white-1"
                          onClick={() => {
                            sendFriendRequest(user._id);
                          }}
                        >
                          Add Friend <AiOutlinePlus />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default Messages;
