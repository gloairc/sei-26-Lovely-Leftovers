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
    const onlyActiveFoodList = (batch.foodListings).filter(function (food) {
      return food.status === "active"
    });
    return onlyActiveFoodList.map((foodItem) => {
      const foodData = {
        title: foodItem.title,
        quantity: foodItem.quantity,
        bestBefore: foodItem.bestBefore,
        category: foodItem.category,
        isHalal: foodItem.isHalal,
        isVegetarian: foodItem.isVegetarian,
        imgFile: foodItem.imgFile,
        queryPath: "/" + batch._id + "/" + foodItem._id,
      };
      return <FoodCard foodData={foodData} />;
    });
  });
  useEffect(() => {
    axios.get(`/batch`).then((response) => {
      // console.log("axios response", response.data)
      // need to filter and remove inactive batches, then setFullList to map out
      const onlyActiveBatch = (response.data).filter(function (batch) {
        return batch.status === "active"
      });
      // console.log("only active batch", onlyActiveBatch);
      setFullList(onlyActiveBatch);
      // console.log("full list to map", fullList);
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
