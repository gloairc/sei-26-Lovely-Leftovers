import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = (props) => {
  const [userType, setUserType] = useState(sessionStorage.getItem("userType"));

  const [contributorNav, setContributorNav] = useState(false);
  const [recipientNav, setRecipientNav] = useState(false);

  useEffect(() => {
    if (userType === "Contributor") {
      setContributorNav(true);
    } else if (userType === "Recipient") {
      setRecipientNav(true);
    }
  }, []);

  return (
    <Navbar bg="light" expand="lg" fixed="top" style={{ position: "sticky" }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/about">About Us</Nav.Link>

          <Nav.Link href="/listings">Listings</Nav.Link>
          {contributorNav ? (
            <>
              <Nav.Link href="/user/60069e52a70d026203aea575">Account</Nav.Link>
              <Nav.Link href="/contributions">Contributions</Nav.Link>
              <Nav.Link href="/contribute">Contribute</Nav.Link>
            </>
          ) : (
            ""
          )}

          {recipientNav ? (
            <>
              <Nav.Link href="/user/60069e52a70d026203aea575">Account</Nav.Link>
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
            style={{ margin: "1px 2px", width: "90px" }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              href="/login"
              size="md"
              style={{ margin: "1px 2px", width: "90px" }}
            >
              Login
            </Button>
            <Button
              href="/user/new"
              size="md"
              style={{ margin: "1px 2px", width: "90px" }}
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
