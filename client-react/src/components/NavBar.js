import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { StatusProvider, useUser, useDispatch } from "./context/Context";

const NavBar = (props) => {
  const [userType, setUserType] = useState(sessionStorage.getItem("userType"));

  const [contributorNav, setContributorNav] = useState(false);
  const [recipientNav, setRecipientNav] = useState(false);

  const ShowStatus = () => {
    const { status } = useUser();
    return <button onClick={() => console.log(status)}>CLICK ME</button>;
  };

  const Trigger = () => {
    const dispatch = useDispatch();
    console.log(dispatch);
    return (
      <button onClick={() => dispatch({ type: "logged in" })}>log in</button>
    );
  };

  // useEffect(() => {
  //   if (userType === "Contributor") {
  //     setContributorNav(true);
  //   } else if (userType === "Recipient") {
  //     setRecipientNav(true);
  //   }
  // }, []);

  return (
    <Navbar bg="light" expand="lg" fixed="top" style={{ position: "sticky" }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/about">About Us</Nav.Link>

          <Nav.Link href="/listings">Listings</Nav.Link>

          <>
            <Nav.Link href="/user/60069e52a70d026203aea575">Account</Nav.Link>
            <Nav.Link href="/contributions">Contributions</Nav.Link>
            <Nav.Link href="/contribute">Contribute</Nav.Link>
          </>

          <>
            <Nav.Link href="/user/60069e52a70d026203aea575">Account</Nav.Link>
            <Nav.Link href="/collections">Collections</Nav.Link>
          </>
        </Nav>
        <StatusProvider>
          <Trigger />
          <ShowStatus />
        </StatusProvider>
      </Navbar.Collapse>
      <Col md={3} xs={2} xl={2} lg={2}>
        <Button
          href="/logout"
          size="md"
          style={{ margin: "1px 2px", width: "90px" }}
        >
          Logout
        </Button>

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
      </Col>
    </Navbar>
  );
};

export default NavBar;
