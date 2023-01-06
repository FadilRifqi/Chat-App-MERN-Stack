import React from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useLogOutUserMutation } from "../services/appApi";
const NavigationBar = () => {
  const [logOut, { loading, error }] = useLogOutUserMutation();
  const handleLogOut = async () => {
    logOut().then((data) => {
      if (data) {
        console.log(data);
      }
    });
  };
  return (
    <Navbar className="bg-img py-4" expand="lg">
      <div className="d-flex flex-row mx-3 container">
        <Navbar.Brand href="#home">Chat App</Navbar.Brand>
        <Nav className="me-auto">
          <Button variant="danger" onClick={handleLogOut}>
            Log Out
          </Button>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-head" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
