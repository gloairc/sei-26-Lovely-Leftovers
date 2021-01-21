import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Account = () => {
  const [formData, setFormData] = useState({});

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`/user/${userId}`)
      .then((response) => {
        setFormData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const keyWidth = 3;
  const valueWidth = 5;
  const buffer = 1;

  return (
    <div>
      {userId ? (
        <div className="accForm">
          <div className="leftForm">
            <Row sm={2} style={{ margin: "10px 0 2px 2px" }}>
              <Col sm={buffer}></Col>
              <h2>Account Details</h2>
            </Row>
            <Row>
              <Col sm={buffer}></Col>
              <Col sm={keyWidth}>Account Type: </Col>
              <Col sm={valueWidth}>{formData.type}</Col>
            </Row>
            <Row>
              <Col sm={buffer}></Col>
              <Col sm={keyWidth}>Username: </Col>
              <Col sm={valueWidth}>{formData.username}</Col>
            </Row>
            <Row>
              <Col sm={buffer}></Col>
              <Col sm={keyWidth}>First Name: </Col>
              <Col sm={valueWidth}>{formData.firstName}</Col>
            </Row>
            <Row>
              <Col sm={buffer}></Col>
              <Col sm={keyWidth}>Family Name: </Col>
              <Col sm={valueWidth}>{formData.familyName}</Col>
            </Row>
            <Row>
              <Col sm={buffer}></Col>
              <Col sm={keyWidth}>Organisation: </Col>
              <Col sm={valueWidth}>{formData.organisation}</Col>
            </Row>
            <Row>
              <Col sm={buffer}></Col>
              <Col sm={keyWidth}>Contact Number: </Col>
              <Col sm={valueWidth}>{formData.contactNum}</Col>
            </Row>
            <Row>
              <Col sm={buffer}></Col>
              <Col sm={keyWidth}>Email Address: </Col>
              <Col sm={valueWidth}>{formData.email}</Col>
            </Row>
          </div>
          <div className="rightForm">
            <div className="rightLink">
              <Link to={`/user/${userId}/edit`}>Edit Profile</Link>
            </div>
            <div className="rightLink">
              <Link to={`/user/${userId}/changepassword`}>Change Password</Link>
            </div>
            <div className="rightLink">
              <Link to={`/user/${userId}/delete`}>Delete Account</Link>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to={"/about"} />
      )}
    </div>
  );
};

export default Account;
