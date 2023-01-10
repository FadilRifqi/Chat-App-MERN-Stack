import axios from "axios";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

const FriendModal = ({ showRequest, setShowRequest, request }) => {
  const { user } = useSelector((state) => state.auth);
  const rejectFriend = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/friend/reject/${id}`,
        {
          sender: user._id,
        }
      );
      console.log(response);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  const acceptFriend = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/friend/accept/${id}`,
        {
          sender: user._id,
        }
      );
      console.log(response);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  return (
    <div
      className={`${
        showRequest ? "modal-friend-show" : "modal-friend-hide"
      } modal-cont border`}
    >
      <div
        className="close-btn"
        onClick={() => {
          setShowRequest(false);
        }}
      >
        <AiOutlineClose />
      </div>
      <Container className="mt-3 overflow-hidden">
        <Row className="all-user-container-2">
          {request.map((user, i) => {
            return (
              <Col md={4}>
                <div className="d-flex flex-column">
                  <div className=" p-3 my-2 d-flex flex-column border">
                    <div className="chat-user d-flex flex-row gap-3">
                      <img
                        src={"/image/60111.jpg"}
                        style={{ height: "50px", width: "50px" }}
                        className="profile-picture"
                      />
                      <div className="d-flex flex-row gap-1">
                        <p className="user-name">{user.user.name}</p>
                        <div
                          className={`${
                            user.status === "Online"
                              ? "status-online"
                              : "status-offline"
                          } mt-2`}
                        ></div>
                      </div>
                    </div>
                    <div className="unread-msg-box mt-3 d-flex gap-3 ">
                      <Button
                        className="btn-white-1"
                        onClick={() => {
                          acceptFriend(user.id);
                        }}
                      >
                        Accept <AiOutlinePlus />
                      </Button>
                      <Button
                        className="btn-danger"
                        onClick={() => {
                          rejectFriend(user.id);
                        }}
                      >
                        Reject <AiOutlinePlus />
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

export default FriendModal;
