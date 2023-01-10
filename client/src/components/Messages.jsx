import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import FriendList from "./FriendList";
import UserModal from "./UserModal";
import FriendModal from "./FriendModal";
const Messages = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [length, setLength] = useState(0);
  const [request, setRequest] = useState([]);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const handleFriendRequests = async () => {
    setShowRequest(true);
  };

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

  const getFriendReq = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/friend/${user._id}`
      );
      const data = await response.data;
      setLength(data.length);
      setRequest(data);
      console.log(data.length);
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
    getFriendReq();
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
        <Row>
          <Col>
            <Button
              className="btn-white-1 w-100 border"
              onClick={handleFriendRequests}
            >
              Friend Request <span className="color-red">{length}</span>
            </Button>
          </Col>
        </Row>
      </div>
      <FriendList friends={friends} setSender={props.setSender} />
      <UserModal
        showModal={showModal}
        users={users}
        setShowModal={setShowModal}
      />
      <FriendModal
        request={request}
        showRequest={showRequest}
        setShowRequest={setShowRequest}
      />
    </Container>
  );
};

export default Messages;
