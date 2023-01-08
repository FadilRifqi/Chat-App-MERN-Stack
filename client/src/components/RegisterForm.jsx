import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpUserMutation } from "../services/appApi";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signUpUser, reset } from "../features/userSlice";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [msg, setMsg] = useState(null);
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
    } else if (message) {
      setMsg(message);
      dispatch(reset());
    }
  }, [user, isSuccess, dispatch, navigate, message]);

  const handleSubmit = async (e) => {
    setIsSubmit(true);
    e.preventDefault();
    dispatch(signUpUser({ name: name, email: email, password: password }));
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
