import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, GetMe, reset } from "../features/userSlice";
import { useEffect } from "react";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const { socket } = useContext(AppContext);
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
    } else if (message) {
      setMsg(message);
      dispatch(reset());
    }
  }, [user, isSuccess, dispatch, navigate, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    dispatch(LoginUser({ name: name, email: name, password: password }));
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
              <Form.Label
                className={`w-100 text-center${
                  isSubmit ? (isSuccess ? " bg-success-2" : " bg-danger-2") : ""
                }`}
              >
                {isSubmit ? (isSuccess ? "Success" : msg) : ""}
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
                {isLoading ? "Loading" : "Sign In"}
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
