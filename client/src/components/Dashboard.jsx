import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChatRoom from "./ChatRoom";
import Messages from "./Messages";

const Dashboard = () => {
  return (
    <Container className="py-3 mt-1 bg-img h-max">
      <Row className="h-max my-3">
        <Col md={4} className="h-full">
          <Messages />
        </Col>
        <Col md={8} className="h-90">
          <ChatRoom />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
