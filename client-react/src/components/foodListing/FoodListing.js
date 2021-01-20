import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, CardColumns } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
import "./style.css";
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
      setFullList(response.data);
      setHandleData(true);
    });
  }, [handleData]);

  return (
    <div className="foodContainer">
      <div className="header">
        <h1>Food Listing</h1>
      </div>

      <Container>
        <CardColumns>
          {/* {console.log(fullList)} */}
          {renderFoodCards}
        </CardColumns>
      </Container>
    </div>
  );
};

export default FoodListing;
