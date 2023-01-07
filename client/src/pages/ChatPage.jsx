import React from "react";
import Chat from "../components/Chat";
import Layout from "./Layout";

const ChatPage = () => {
  return (
    <Layout selected={"chat"}>
      <Chat />
    </Layout>
  );
};

export default ChatPage;
