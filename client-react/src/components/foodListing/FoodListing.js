import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
// use lodash chunking?

const FoodListing = () => {
  const [fullList, setFullList] = useState([]);
  const [handleData, setHandleData] = useState(false);
  const renderFoodCards = fullList.map((batch) => {
    return batch.foodListings.map((foodItem) => {
      const foodData = {
        title: foodItem.title,
        quantity: foodItem.quantity,
        bestBefore: foodItem.bestBefore,
        queryPath: "/" + batch._id + "/" + foodItem._id,
      };
      return <FoodCard foodData={foodData} />;
    });
  });
  useEffect(() => {
    axios.get(`/batch`).then((response) => {
      setFullList(response.data.data);
      setHandleData(true);
    });
  }, [handleData]);

  return (
    <>
      <h2>Food Listing</h2>
      <br />
      <Container>
        {/* {console.log(fullList)} */}
        {renderFoodCards}
      </Container>
    </>
  );
};

export default FoodListing;
