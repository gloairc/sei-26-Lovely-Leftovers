import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { StatusProvider, useUser, useDispatch } from "./context/Context";

const NavBar = (props) => {
  const [userType, setUserType] = useState(sessionStorage.getItem("userType"));
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  const handleClick = (event) => {
    setUserType(sessionStorage.getItem("userType"));
    setUserId(sessionStorage.getItem("userId"));
  };

  useEffect(() => {
    setUserType(sessionStorage.getItem("userType"));
    setUserId(sessionStorage.getItem("userId"));
  }, [props]);

  return (
    <Navbar
      bg="light"
      expand="lg"
      fixed="top"
      style={{ position: "sticky", fontWeight: "bold" }}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/about">About Us</Nav.Link>

          <Nav.Link href="/listings">Listings</Nav.Link>
          {userType === "Contributor" ? (
            <>
              <Nav.Link href={`/user/${userId}`}>Account</Nav.Link>
              <Nav.Link href="/contributions">Contributions</Nav.Link>
              <Nav.Link href="/contribute">Contribute</Nav.Link>
            </>
          ) : (
            ""
          )}

          {userType === "Recipient" ? (
            <>
              <Nav.Link href={`/user/${userId}`}>Account</Nav.Link>
              <Nav.Link href="/collections">Collections</Nav.Link>
            </>
          ) : (
            ""
          )}
        </Nav>
      </Navbar.Collapse>
      <Col md={3} xs={2} xl={2} lg={2}>
        {userType ? (
          <Button
            href="/logout"
            size="md"
            variant="success"
            style={{ margin: "1px 2px", width: "90px", borderRadius: "20px" }}
            onClick={handleClick}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              href="/login"
              size="md"
              variant="success"
              style={{ margin: "1px 2px", width: "90px", borderRadius: "20px" }}
            >
              Login
            </Button>

            <Button
              variant="success"
              href="/user/new"
              size="md"
              style={{ margin: "1px 2px", width: "90px", borderRadius: "20px" }}
              onClick={handleClick}
            >
              Sign Up
            </Button>
          </>
        )}
      </Col>
    </Navbar>
  );
};

export default NavBar;
