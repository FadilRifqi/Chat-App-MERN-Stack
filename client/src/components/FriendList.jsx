import React from "react";

const FriendList = (props) => {
  return (
    <div className="my-2 friend-container">
      {props.friends.map((friend, i) => {
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
  );
};

export default FriendList;
