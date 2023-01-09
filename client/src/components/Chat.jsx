import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AppContext } from "../context/appContext";
import ChatRoom from "./ChatRoom";
import Messages from "./Messages";
import { useGetUsersMutation } from "../services/appApi";

const Chat = () => {
  const { members } = useContext(AppContext);
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const getMe = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const data = response.data;
      console.log(data);
    } catch (error) {
      if (error) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <Container className="py-3 mt-1 bg-img h-max border container-body px-3">
      <Row className="h-auto my-3 bg-img px-3">
        <Col md={4} className="h-full">
          <Messages setSender={setSender} />
        </Col>
        <Col md={8} className="h-90">
          <ChatRoom sender={sender} receiver={receiver} />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
