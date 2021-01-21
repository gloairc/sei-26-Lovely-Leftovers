import React from "react";
import { useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css";

const ItemDetailsShow = ({ foodData, batchData }) => {
  //   const handleCreateUser = (event) => {
  //     event.preventDefault();
  //     axios.post("/users", formData).then((response) => {
  //       console.log("response", response);
  //       setCreated(true);
  //     });
  //   };
  console.log(foodData)

  const IsHalalTF = (foodData.isHalal === true) ? "Yes" : "No";
  const IsVegTF = (foodData.isVegetarian === true) ? "Yes" : "No"


  return (
    <Container>
      <Row>
        <Col><p><span class="font-weight-bold">Title: </span>{foodData.title}</p></Col>
      </Row>

      <Row>
        <Col><p><span class="font-weight-bold">Quantity: </span>{foodData.quantity}</p></Col>
      </Row>

      <Row>
        <Col><p><span class="font-weight-bold">Category: </span>{foodData.category}</p></Col>
      </Row>

      <Row>
        <Col><p><span class="font-weight-bold">Halal? </span> {IsHalalTF}</p></Col>
      </Row>

      <Row>
        <Col><p><span class="font-weight-bold">Vegetarian? </span> {IsVegTF}</p></Col>
      </Row>

      <Row>
        <Col><p><span class="font-weight-bold">Description: </span>{foodData.description}</p></Col>
      </Row>

      <Row>
        <Col>
          <p><span class="font-weight-bold"> Best Before Date: </span>{foodData.bestBefore}</p>
          {/* <Moment format="DD/MM/YYYY"> {foodData.bestBefore}</Moment> */}
        </Col>
      </Row>

      <Row>
        <Col> <p><span class="font-weight-bold">Collection Address: </span>{batchData.collectionAddress}</p></Col>
      </Row>

      <Row>
        <Col> <p><span class="font-weight-bold">Contact Person: </span> {batchData.contactPerson}</p></Col>
      </Row>

      <Row>
        <Col> <p><span class="font-weight-bold">Contact Number: </span>{batchData.contactNum}</p></Col>
      </Row>

      {/* <Row>
            <Col>
              <Button type="submit" style={{ margin: "10px 0" }}>
                Create Account
              </Button>
            </Col>
          </Row> */}
    </Container>
  );
};

export default ItemDetailsShow;
