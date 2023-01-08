import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditUser from "../components/EditUser";
import Layout from "./Layout";

const EditPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("tes");
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return user && user.newUser ? (
    <Container>
      <EditUser />
    </Container>
  ) : (
    <Layout>
      <EditUser />
    </Layout>
  );
};

export default EditPage;
