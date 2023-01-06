import React from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsBookmarkFill } from "react-icons/bs";
import { TiCalculator } from "react-icons/ti";
const ChatRoom = () => {
  const [isMarked, setIsMarked] = useState(true);
  return (
    <div className="bg-fff h-90 border-chat-box">
      <div className="d-flex flex-row justify-content-between head">
        <div className=" d-flex flex-row gap-2 mx-3">
          <img
            src="/image/60111.jpg"
            style={{ height: "50px", width: "50px" }}
            className="profile-picture m-2"
          />
          <p className="color-white">
            Conversation with <span className="user-text">Fadil</span>
          </p>
        </div>
        <div className="right-side d-flex flex-row gap-2">
          <div>
            <Button className="btn-white-2">Agree to Offer</Button>
          </div>
          <BsBookmarkFill
            className={`${isMarked ? "marked" : "unmarked"}`}
            onClick={() => {
              setIsMarked(!isMarked);
            }}
          />
        </div>
      </div>
      <div className="chat-room-body">
        <Container className="d-flex flex-column">
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-right">
              <p className="mx-2 text-sm mt-1">12.30</p>
            </div>
            <div className=" d-flex row-chat-right ">
              <div className="pop-up-right">halo</div>
            </div>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-left flex-row gap-2">
              <img
                src="/image/60111.jpg"
                style={{ height: "24px", width: "24px" }}
                className="profile-picture"
              />
              <p className="">Fadil</p>
              <p className="mx-2 text-sm mt-1">12.30</p>
            </div>
            <div className=" d-flex row-chat-left ">
              <div className="pop-up-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
                laudantium rerum soluta ab ipsam numquam. Voluptatem esse
                adipisci ullam tenetur laudantium fugiat sint eos? A et
                voluptatum assumenda alias ex!
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ChatRoom;
