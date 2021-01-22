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
import "bootstrap/dist/css/bootstrap.min.css";

const ItemDetailsAdd = ({ foodList, foodIndex, setFoodList }) => {
  const [foodDetails, setFoodDetails] = useState(foodList[foodIndex]);
  const [selectedCat, setSelectedCat] = useState([]);
  const newFoodList = foodList.splice(foodIndex, 1, foodDetails);
  const foodCat = [
    "Meat",
    "Seafood",
    "Fruits",
    "Vegetables",
    "Carbs",
    "Snack",
    "Dairy & Eggs",
    "Canned food",
    "Dessert",
    "Drinks",
    "Frozen",
    "Chilled",
  ];
  const renderFoodCat = foodCat.map((foodItem) => {
    return (
      <Form.Check inline type="checkbox" label={foodItem} value={foodItem} />
    );
  });
  const toBoolean = (inputString) => {
    if (inputString === "Yes") {
      return true;
    } else {
      return false;
    }
  };

  const units = ["g", "kg", "ml", "L"];
  const renderUnit = units.map((indivUnit) => {
    return (
      <Form.Check
        inline
        type="radio"
        label={indivUnit}
        value={indivUnit}
        name="radioGroup"
      />
    );
  });

  return (
    <Container>
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
          Est. weight per item:{" "}
          <FormControl
            type="number"
            title="weight"
            onChange={(event) => {
              setFoodDetails((state) => {
                return { ...state, weight: event.target.value };
              });
            }}
          />
        </Col>
        <Col>
          Unit:{" "}
          <Form.Group
            title="unit"
            onChange={(event) => {
              let selectedUnit = "";
              if (event.target.checked) {
                selectedUnit = event.target.checked;
              }
              setFoodDetails((state) => {
                return { ...state, unit: event.target.value };
              });
            }}
          >
            {renderUnit}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          Category:
          <Form.Group
            title="category"
            onChange={(event) => {
              const newList = selectedCat;
              if (event.target.checked) {
                newList.push(event.target.value);
              } else {
                newList.splice(newList.indexOf(event.target.value), 1);
              }
              setSelectedCat(newList);
              setFoodDetails((state) => {
                return {
                  ...state,
                  category: selectedCat,
                };
              });
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
            }}
          >
            <option>(Select One Below)</option>
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
            }}
          >
            <option>(Select One Below)</option>
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
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Best Before Date: (Format: "DD/MM/YYYY")
          <FormControl
            type="date"
            title="bestBefore"
            onChange={(event) => {
              setFoodDetails((state) => {
                const formattedDate = new Date(
                  Date.parse(event.target.value)
                ).toLocaleDateString("en-SG");
                return { ...state, bestBefore: formattedDate }; //returning as a string
              });
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col></Col>
        {/* <Col></Col> this is for testing
        <Col></Col>
        <Col></Col>
        <Col>
          <Button
            type="button"
            onClick={() => {
              console.log("Saved");
              console.log(foodDetails);
              console.log(foodList);
            }}
            style={{ margin: "10px 0" }}
          >
            Save
          </Button>
        </Col> */}
      </Row>
    </Container>
  );
};

export default ItemDetailsAdd;
