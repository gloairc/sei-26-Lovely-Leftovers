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

const ItemDetailsAdd = ({ foodList, foodIndex, setFoodList }) => {
  //   const handleCreateUser = (event) => {
  //     event.preventDefault();
  //     axios.post("/users", formData).then((response) => {
  //       console.log("response", response);
  //       setCreated(true);
  //     });
  //   };
  const [foodDetails, setFoodDetails] = useState(foodList[foodIndex]);
  const newFoodList = foodList.splice(foodIndex, 1, foodDetails);
  // setFoodList(newFoodList);

  return (
    <Container>
      {/* {console.log(foodDetails)} */}
      <Row>
        <Col>
          Title:{" "}
          <FormControl
            type="text"
            title="title"
            onChange={(event) => {
              setFoodDetails((state) => {
                return { ...state, title: event.target.value };
              });
              setFoodList(newFoodList);
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Quantity:{" "}
          <FormControl
            type="number"
            title="quantity"
            onChange={(event) => {
              setFoodDetails((state) => {
                return { ...state, quantity: event.target.value };
              });
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Category:{" "}
          <FormControl
            type="text"
            title="category"
            value={["fruit", "beef", "pork"]}
            onChange={(event) => {
              setFoodDetails((state) => {
                return { ...state, category: event.target.value };
              });
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Is this Halal?:{" "}
          <FormControl
            type="boolean"
            title="isHalal"
            onChange={(event) => {
              setFoodDetails((state) => {
                return { ...state, isHalal: event.target.value };
              });
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Is this vegetarian?:{" "}
          <FormControl
            type="boolean"
            title="isVegetarian"
            onChange={(event) => {
              setFoodDetails((state) => {
                return { ...state, isVegetarian: event.target.value };
              });
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Description:{" "}
          <FormControl
            type="text"
            title="description"
            onChange={(event) => {
              setFoodDetails((state) => {
                return { ...state, description: event.target.value };
              });
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Best Before Date:{" "}
          <FormControl
            type="text"
            title="bestBefore"
            onChange={(event) => {
              setFoodDetails((state) => {
                return { ...state, bestBefore: event.target.value };
              });
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetailsAdd;
