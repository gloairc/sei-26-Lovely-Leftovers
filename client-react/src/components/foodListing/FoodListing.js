import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
// use lodash chunking?

const FoodListing = (params) => {
  const [foodList, setFoodList] = useState();
  const [batchList, setBatchList] = useState([]);
  const [fullList, setFullList] = useState([]);

  const getAllBatchId = (batchData) => {
    return batchData.map((data) => {
      return data._id;
    });
  };
  const getAllFoodId = (fullList) => {
    let displayItem = [];
    for (let i = 0; i < fullList.length; i++) {
      displayItem.push(
        fullList[i].foodListings.map((foodItem) => {
          return foodItem._id;
        })
      );
    }
  };

  const getDataForDisplay = (responseData) => {
    responseData.forEach((batch) => {
      if (batch.status === "active") {
      }
    });
  };

  // const getAllFoodId = (fullList) => {
  //   let displayItem = [];
  //   for (let i = 0; i < fullList.length; i++) {
  //     displayItem.push(
  //       fullList[i].foodListings.map((foodItem) => {
  //         return foodItem._id;
  //       })
  //     );
  //   }
  // };

  // // const renderFoodListing = (batchIds) => {
  //   let food
  //   for (let i=0; i<batchIds.length; i++) {

  //   }
  //   return ( )
  // }

  useEffect(() => {
    axios.get(`/batch`).then((response) => {
      setBatchList(getAllBatchId(response.data));
      setFullList(response.data);
      // setBatchList(getAllBatchId(response.data));
    });
  }, []);

  return (
    <>
      <h2>Food Listing</h2>
      <br />
      {console.log(fullList)}
      <Container>
        {fullList.map((batch) => {
          console.log(batch.foodListings.length);
          return batch.foodListings.map((foodItem) => {
            const foodData = {
              title: foodItem.title,
              quantity: foodItem.quantity,
              bestBefore: foodItem.bestBefore,
              queryPath: "/" + batch._id + "/" + foodItem._id,
            };
            return <FoodCard foodData={foodData} />;
          });

          // each "data" will have query string, food title, food qty, food bestBefore date
        })}
      </Container>
    </>
  );
};

export default FoodListing;
