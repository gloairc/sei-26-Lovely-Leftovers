import React, { useState, useEffect } from "react";
import FoodCard from "../foodListing/FoodCard";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const CollectionView = () => {
  const [userCollected, setUserCollected] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    axios.get(`/user/${userId}`).then((response) => {
      const foodList = response.data.receivedList.map((foodId) => {
        return foodId;
      });
      setUserCollected(foodList);

      axios.get("/batch").then((batchResponse) => {
        setFullList(batchResponse.data);
      });
    });
    setDataLoaded(true);
  }, [dataLoaded]);

  const renderFoodCards = fullList.map((batch) => {
    return batch.foodListings.map((foodItem) => {
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

      if (userCollected.includes(foodItem._id)) {
        return <FoodCard foodData={foodData} />;
      }
    });
  });

  return (
    <div>
      <h2>My Collections</h2>

      {renderFoodCards}
    </div>
  );
};

export default CollectionView;
