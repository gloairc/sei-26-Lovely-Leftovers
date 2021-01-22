import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, CardColumns } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
import "./style.css";

const FoodListing = () => {
  const [fullList, setFullList] = useState([]);
  const [handleData, setHandleData] = useState(false);
  const renderFoodCards = fullList.map((batch) => {
    const onlyActiveFoodList = batch.foodListings.filter(function (food) {
      return food.status === "active";
    });
    return onlyActiveFoodList.map((foodItem) => {
      const foodData = {
        title: foodItem.title,
        quantity: foodItem.quantity,
        weight: foodItem.weight,
        unit: foodItem.unit,
        bestBefore: foodItem.bestBefore,
        category: foodItem.category,
        isHalal: foodItem.isHalal,
        isVegetarian: foodItem.isVegetarian,
        imgFile: foodItem.imgFile,
        queryPath: "/" + batch._id + "/" + foodItem._id,
      };
      console.log("foodData", foodData);
      return <FoodCard foodData={foodData} />;
    });
  });
  useEffect(() => {
    axios.get(`/batch`).then((response) => {
      const onlyActiveBatch = response.data.filter(function (batch) {
        return batch.status === "active";
      });
      setFullList(onlyActiveBatch);
      setHandleData(true);
    });
  }, [handleData]);

  return (
    <div className="foodContainer">
      <div className="header">
        <h1>Food Listing</h1>
      </div>

      <Container>
        <CardColumns>{renderFoodCards}</CardColumns>
      </Container>
    </div>
  );
};

export default FoodListing;
