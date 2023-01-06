import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Main from "./pages/Main";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
