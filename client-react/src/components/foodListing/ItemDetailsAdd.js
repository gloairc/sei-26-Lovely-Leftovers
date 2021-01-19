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

const ItemDetailsAdd = ({ foodData }) => {
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
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetailsAdd;
