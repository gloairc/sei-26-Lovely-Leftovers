import React from "react";
import { Navbar, Nav, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const isContributor = true; // temporary control for contributor vs recipient

const NavBar = (props) => {
  return (
    <Navbar bg="light" expand="lg" fixed="top" style={{ position: "sticky" }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Navbar.Brand href="/">Pet Search</Navbar.Brand> */}
          {/* <Nav.Link href="/">Landing</Nav.Link> */}

          <Nav.Link href="/about">About Us</Nav.Link>

          <Nav.Link href="/listings">Listings</Nav.Link>

          <Nav.Link href="/user/60069e52a70d026203aea575">Account</Nav.Link>
          {isContributor ? (
            <>
              <Nav.Link href="/contributions">Contributions</Nav.Link>
              <Nav.Link href="/contribute">Contribute</Nav.Link>
            </>
          ) : (
              <>
                <Nav.Link href="/collections">Collections</Nav.Link>
              </>
            )}
        </Nav>
      </Navbar.Collapse>
      <Col md={3} xs={2} xl={2} lg={2}>
        <Button
          href="/logout"
          size="md"
          style={{ margin: "1px 2px", width: "90px" }}
        >
          Logout
        </Button>
        <Button
          href="/login"
          size="md"
          style={{ margin: "1px 2px", width: "90px" }}
        >
          Login
        </Button>
        <Button
          href="/signup"
          size="md"
          style={{ margin: "1px 2px", width: "90px" }}
        >
          Sign Up
        </Button>
      </Col>
    </Navbar>
  );
};

export default NavBar;
