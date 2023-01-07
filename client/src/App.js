import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ChatPage from "./pages/ChatPage";
import Dashboard from "./pages/Dashboard";
import Pinned from "./pages/Pinned";
import { AppContext, socket } from "./context/appContext";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/register",
      element: <RegisterForm />,
    },
    {
      path: "/pinned",
      element: <Pinned />,
    },
    {
      path: "/chat",
      element: <ChatPage />,
    },
  ]);
  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        rooms,
        setRooms,
        newMessages,
        setNewMessages,
      }}
    >
      <RouterProvider router={router} />{" "}
    </AppContext.Provider>
  );
}

export default App;
