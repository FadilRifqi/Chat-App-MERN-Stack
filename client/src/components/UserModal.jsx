import axios from "axios";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

const UserModal = ({ showModal, setShowModal, users }) => {
  const { user } = useSelector((state) => state.auth);
  const sendFriendRequest = async (receiver) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/friend/${receiver}`,
        {
          sender: user._id,
        }
      );
      const data = await response.data;
      console.log(data);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  return (
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
  );
};

export default UserModal;
