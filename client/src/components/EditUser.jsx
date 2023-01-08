import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { updateUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const EditUser = () => {
  const { user } = useSelector((state) => state.auth);
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [name, setName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  const validateImg = (e) => {
    const file = e.target.files[0];
    console.log(e);
    if (file >= 1048576) {
      return alert("Max file is 1Mb");
    } else {
      setImg(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };
  const skip = async () => {
    dispatch(
      updateUser({
        name: name || user.name,
        img: img || user.img,
        _id: user._id,
      })
    );
  };
  return (
    <div className="min-h-100 my-5 w-100">
      <div
        className={`mx-4 d-flex flex-row ${
          user
            ? user.newUser
              ? "justify-content-between"
              : "justify-content-center"
            : ""
        }`}
      >
        {user ? (
          user.newUser ? (
            <h3>Change Your Profile Picture</h3>
          ) : (
            <h3>Edit Your Profile</h3>
          )
        ) : (
          <></>
        )}
        {user ? (
          user.newUser ? (
            <Button
              onClick={skip}
              className="btn-warning"
              style={{ width: "96px" }}
            >
              Skip
            </Button>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      <Row className="justify-content-center edit-content">
        <Col md={6} className=" d-flex flex-row">
          <div className="picture-box">
            <img
              src={imgPreview || "/image/60111.jpg"}
              className=""
              alt={imgPreview}
            />
          </div>
          <Container className="edit-box w-100 d-flex flex-column gap-3">
            <Form.Control
              id="input"
              type="file"
              className="upload"
              onChange={(e) => {
                validateImg(e);
              }}
            />
            <label for="input" className="btn btn-purple-upload">
              Change Profile Picture
            </label>
            <Button
              className="btn-white"
              onClick={() => {
                setImgPreview(null);
              }}
            >
              <span className="color-red">
                <FaRegTrashAlt />
              </span>{" "}
              Delete
            </Button>
          </Container>
        </Col>
      </Row>
      {user ? (
        user.newUser ? (
          <>
            <Row className=" flex-column align-center mt-5">
              <Col md={6}>
                <Form className="my-3">
                  <Form.Group>
                    <Form.Text>Username</Form.Text>
                    <Form.Control type="text" />
                  </Form.Group>
                  <br />
                  <Form.Group className="pos-rel">
                    <Form.Text>Email</Form.Text>
                    <div className="d-flex flex-row">
                      <Form.Control type="text" disabled={isDisabled} />
                      <Button
                        className="pos-abs btn-warning"
                        onClick={() => {
                          setIsDisabled(!isDisabled);
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  </Form.Group>
                  <br />
                  <Button className="btn-purple">Submit</Button>
                </Form>
              </Col>
            </Row>
          </>
        ) : (
          <>false</>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditUser;
