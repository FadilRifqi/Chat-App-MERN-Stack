import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  return (
    <div className="h-max">
      <Row className="h-max">
        <Col
          sm={6}
          className="m-0-auto bg-fff  d-flex flex-column justify-content-center"
        >
          <Form className=" form-box d-flex justify-content-center flex-column">
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
                type="text"
                placeholder="Enter Your Username or Email"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="********" />
            </Form.Group>
            <br />
            <Form.Group className="d-flex flex-row justify-content-between">
              <Form.Check label="Remember Me" />
              <Link className="color-purple">Forgot Password</Link>
            </Form.Group>
            <br />
            <Form.Group className="">
              <Button className="btn-purple w-100">Sign In</Button>
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
                <span className="color-purple">Sign Up</span>
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
