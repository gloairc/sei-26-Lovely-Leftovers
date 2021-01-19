import React from "react";
import { useState, useEffect } from "react";
import { Form, FormControl, Button, Row, Col } from "react-bootstrap";
import { Redirect, useParams } from "react-router-dom";
import ItemDetailsAdd from "../foodListing/ItemDetailsAdd";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ContributionAdd = () => {
  //   let { batchId, foodId } = useParams();
  const [foodDetails, setFoodDetails] = useState({});
  const [inputFoodArray, setInputFoodArray] = useState([
    <Row>
      <Col>
        <ItemDetailsAdd />
        <Button onClick={() => handleRemoveItem()}>-</Button>
      </Col>
    </Row>,
  ]);
  //   const [batchDetails, setBatchDetails] = useState({})

  //test data
  const [batchDetails, setBatchDetails] = useState({
    contactPerson: "test data",
    contactNum: 12345678,
    collectionAddress: "-10 Anson Avenue",
    status: "active",
    foodListings: [
      {
        title: "Mango",
        quantity: 50,
        category: ["fruit"],
        isHalal: true,
        isVegetarian: true,
        description: "Yellow Juicy Yummy",
        bestBefore: Date.now(),
        status: "active",
      },
      {
        title: "Jackfruit",
        quantity: 44,
        category: ["fruit"],
        isHalal: true,
        isVegetarian: true,
        description: "Juicy nice cool Crunchy",
        bestBefore: Date.now(),
        status: "active",
      },
      {
        title: "Durian",
        quantity: 99,
        category: ["fruit"],
        isHalal: true,
        isVegetarian: true,
        description: "Not fresh",
        bestBefore: Date.now(),
        status: "inactive",
      },
    ],
  });
  const [batchCreated, setBatchCreated] = useState(false);
  const handleNewBatch = (event) => {
    event.preventDefault();
    axios.post("/batch", batchDetails).then((response) => {
      setBatchCreated(true);
      console.log(response);
    });
  };
  const handleInputChange = (e, index) => {};

  const handleAddNewItem = () => {
    setInputFoodArray([
      ...inputFoodArray,
      <Row>
        <Col>
          <ItemDetailsAdd />
          <Button onClick={() => handleRemoveItem()}>-</Button>
        </Col>
      </Row>,
    ]);
    console.log("item added");
  };
  const handleRemoveItem = (index) => {
    console.log("item removed");
    const list = [...inputFoodArray];
    list.splice(index, 1);
    setInputFoodArray(list);
  };

  const handleRemoveClick = (index) => {};

  //   useEffect(() => {
  //     axios.get(`/batch/${batchId}`).then((response) => {
  //       const batchData = response.data.data;
  //       batchData.foodListings.forEach((foodItem) => {
  //         if (foodItem._id === foodId) {
  //           setFoodDetails(foodItem);
  //           return;
  //         }
  //       });
  //     });
  //   }, []);

  return (
    <Form onSubmit={handleNewBatch}>
      {inputFoodArray}
      <Button onClick={() => handleAddNewItem()}>+</Button>

      <Row>
        <Col>
          <Button type="submit" style={{ margin: "10px 0" }}>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ContributionAdd;
