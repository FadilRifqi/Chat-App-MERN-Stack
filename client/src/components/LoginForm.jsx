import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLogInUserMutation } from "../services/appApi";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [logInUser, { loading, error }] = useLogInUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsSubmit(true);
    setIsLoading(true);
    e.preventDefault();
    logInUser({ name: name, email: name, password: password }).then((data) => {
      if (data) {
        console.log(data);
        setName("");
        setPassword("");
        setIsLoading(false);
        setIsSuccess(true);
        navigate("/");
      } else {
        setName("");
        setPassword("");
        setIsLoading(false);
        setIsSuccess(false);
      }
    });
  };

  return (
    <div className="h-max">
      <Row className="h-max">
        <Col
          sm={6}
          className="m-0-auto bg-fff  d-flex flex-column justify-content-center"
        >
          <Form
            className=" form-box d-flex justify-content-center flex-column"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group>
              <Form.Label>
                <h1>Welcome Back</h1>
                <p>
                  <em>Welcome Back! Please Enter Your Detail</em>
                </p>
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Enter Your Username or Email"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="********"
              />
            </Form.Group>
            <br />
            <Form.Group className="d-flex flex-row justify-content-between">
              <Form.Check label="Remember Me" />
              <Link className="color-purple">Forgot Password</Link>
            </Form.Group>
            <br />
            <Form.Group className="">
              <Button className="btn-purple w-100" type="submit">
                Sign In
              </Button>
            </Form.Group>
            <br />
            <Form.Group className="">
              <Button className="btn-white-1 w-100">
                <FcGoogle /> Sign In With Google
              </Button>
            </Form.Group>
            <br />
            <Form.Group className="text-center">
              <Form.Text>
                Dont have an account?{" "}
                <Link to={"/register"} className="color-purple">
                  Sign Up
                </Link>
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>
        <Col sm={6} className="m-0-auto bg-img border d-flex flex-column">
          <div className="purple-circle"></div>
          <div className="purple-circle-blur"></div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
