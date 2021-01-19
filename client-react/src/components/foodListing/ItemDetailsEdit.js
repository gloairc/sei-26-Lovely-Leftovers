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
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css";

const ItemDetailsEdit = ({ foodData }) => {
  //   const handleCreateUser = (event) => {
  //     event.preventDefault();
  //     axios.post("/users", formData).then((response) => {
  //       console.log("response", response);
  //       setCreated(true);
  //     });
  //   };

  return (
    <Container>
      <Row>
        <Col>
          Title:{" "}
          <FormControl
            type="text"
            title="title"
            value={foodData.title}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Quantity:{" "}
          <FormControl
            type="number"
            title="quantity"
            value={foodData.quantity}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Category:{" "}
          <FormControl
            type="text"
            title="category"
            value={foodData.category}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Is this Halal?:{" "}
          <FormControl
            type="boolean"
            title="isHalal"
            value={foodData.isHalal}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Is this vegetarian?:{" "}
          <FormControl
            type="boolean"
            title="isVegetarian"
            value={foodData.isVegetarian}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Description:{" "}
          <FormControl
            type="text"
            title="description"
            value={foodData.description}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Best Before Date:{" "}
          <FormControl
            type="text"
            title="bestBefore"
            value={foodData.bestBefore}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Collection Address:{" "}
          <FormControl
            type="text"
            title="collectionAddress"
            value={foodData.collectionAddress}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Contact Person:{" "}
          <FormControl
            type="text"
            title="contactName"
            value={foodData.contactName}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Contact Number:{" "}
          <FormControl
            type="number"
            title="contactNumber"
            value={foodData.contactNumber}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
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

export default ItemDetailsEdit;
