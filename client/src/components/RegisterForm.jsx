import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpUserMutation } from "../services/appApi";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [msg, setMsg] = useState(null);
  const [signUpUser, { loading, error }] = useSignUpUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsSubmit(true);
    setIsLoading(true);
    e.preventDefault();

    //sign up user
    signUpUser({ name, email, password }).then((data) => {
      if (data.error) {
        console.log(data.error.data.msg);
        setMsg(data.error.data.msg);
        setIsLoading(false);
        setIsSuccess(false);
      } else {
        setName("");
        setPassword("");
        setIsLoading(false);
        setIsSuccess(true);
        navigate("/");
      }
    });

    // try {
    //   await axios.post("http://localhost:5000/users", {
    //     name: name,
    //     email: email,
    //     password: password,
    //   });
    //   setName("");
    //   setEmail("");
    //   setPassword("");
    //   setIsLoading(false);
    //   setIsSuccess(true);
    // } catch (error) {
    //   if (error) {
    //     console.log(error);
    //     setIsLoading(false);
    //     setIsSuccess(false);
    //   }
    // }
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
                <h1>Create Account</h1>
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label
                className={`w-100 text-center${
                  isSubmit ? (isSuccess ? " bg-success-2" : " bg-danger-2") : ""
                }`}
              >
                {isSubmit ? (isSuccess ? "Success" : msg) : ""}
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Enter Your Username"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                placeholder="Enter Your Email"
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
            <Form.Group className="">
              <Button className="btn-purple w-100" type="submit">
                {isLoading ? "Loading" : "Sign Up"}
              </Button>
            </Form.Group>
            <br />
            <Form.Group className="">
              <Button className="btn-white-1 w-100">
                <FcGoogle /> Sign Up With Google
              </Button>
            </Form.Group>
            <br />
            <Form.Group className="text-center">
              <Form.Text>
                Already have an account?{" "}
                <Link to={"/login"} className="color-purple">
                  Sign In
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

export default RegisterForm;
