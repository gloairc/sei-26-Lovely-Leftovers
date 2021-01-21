import React from "react";
import { useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Container,
  InputGroup,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
import foodCat from "./dataDump";
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
  const [selectedCat, setSelectedCat] = useState([]);
  const newFoodList = foodList.splice(foodIndex, 1, foodDetails);
  // setFoodList(newFoodList);
  const renderFoodCat = foodCat.map((foodItem) => {
    return <Form.Check type="checkbox" label={foodItem} value={foodItem} />;
  });

  const stringtoDate = (inputString) => {};
  const toBoolean = (inputString) => {
    if (inputString === "Yes") {
      return true;
    } else {
      return false;
    }
  };

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
              setFoodList(newFoodList);
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Category:
          <p>(separate categories with a comma i.e. "fruit,beef,...")</p>
          {/* <FormControl
            type="text"
            title="category"
            onChange={(event) => {
              setFoodDetails((state) => {
                return {
                  ...state,
                  category: event.target.value.split(","),
                };
              });
              setFoodList(newFoodList);
            }}
          ></FormControl> */}
          <Form.Group
            onChange={(event) => {
              const newList = selectedCat;
              if (event.target.checked) {
                newList.push(event.target.value);
              } else {
                // const toRemove = selectedItems.indexOf(event.target.value);
                newList.splice(newList.indexOf(event.target.value), 1);
              }
              setSelectedCat(newList);
              setFoodDetails((state) => {
                return {
                  ...state,
                  category: selectedCat,
                };
              });
              setFoodList(newFoodList);
            }}
          >
            {renderFoodCat}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          Is this Halal?:{" "}
          <FormControl
            type="boolean"
            title="isHalal"
            as="select"
            onChange={(event) => {
              setFoodDetails((state) => {
                return { ...state, isHalal: toBoolean(event.target.value) };
              });
              setFoodList(newFoodList);
            }}
          >
            <option>Yes</option>
            <option>No</option>
          </FormControl>
        </Col>
      </Row>

      <Row>
        <Col>
          Is this vegetarian?:{" "}
          <FormControl
            type="boolean"
            title="isVegetarian"
            as="select"
            onChange={(event) => {
              setFoodDetails((state) => {
                return {
                  ...state,
                  isVegetarian: toBoolean(event.target.value),
                };
              });
              setFoodList(newFoodList);
            }}
          >
            <option>Yes</option>
            <option>No</option>
          </FormControl>
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
              setFoodList(newFoodList);
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Best Before Date: (Format: "DD/MM/YYYY")
          <FormControl
            type="text"
            title="bestBefore"
            onChange={(event) => {
              setFoodDetails((state) => {
                return { ...state, bestBefore: event.target.value };
              });
              setFoodList(newFoodList);
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetailsAdd;
