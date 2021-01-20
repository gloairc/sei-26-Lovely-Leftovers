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
  //   const [batchDetails, setBatchDetails] = useState({})
  const [batchCreated, setBatchCreated] = useState(false);
  const handleNewBatch = (event) => {
    event.preventDefault();
    axios.post("/batch", batchDetails).then((response) => {
      setBatchCreated(true);
      console.log(response);
    });
  };

  //test data
  const [batchDetails, setBatchDetails] = useState([
    {
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
          status: "active",
        },
      ],
    },
  ]);

  const handleAddNewItem = () => {
    console.log("item added");
    return (
      <Row>
        <Col>
          <ItemDetailsAdd />
        </Col>
      </Row>
    );
  };
  const handleRemoveItem = () => {
    console.log("item removed");
  };

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
    <Form onClick={handleNewBatch}>
      <Row>
        <Col>
          <ItemDetailsAdd />
        </Col>
      </Row>

      <Button onClick={() => handleAddNewItem()}>+</Button>
      <Button onClick={() => handleRemoveItem()}>-</Button>
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
