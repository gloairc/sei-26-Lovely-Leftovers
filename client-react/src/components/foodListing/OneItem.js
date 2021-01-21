import React from "react";
import { useState, useEffect } from "react";
import { Form, FormControl, Button, Row, Col, Container } from "react-bootstrap";
import { Redirect, useParams } from "react-router-dom";
import ItemDetailsShow from "./ItemDetailsShow";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const OneItem = () => {
  let { batchId, foodId } = useParams();
  const [foodDetails, setFoodDetails] = useState({});
  const userId = sessionStorage.getItem("userId");
  // const userId = "60079ec9f7b7a342e072ecc2"  //hardcoded for now 
  const [isCollected, setIsCollected] = useState(false)


  useEffect(() => {
    axios.get(`/batch/${batchId}`).then((response) => {
      const batchData = response.data;
      batchData.foodListings.forEach((foodItem) => {
        if (foodItem._id === foodId) {
          setFoodDetails(foodItem);
          return;
        }
      });
    });
  }, []);

  const handleCollect = () => {
    console.log("handling collect Click")
    axios.put("/user/myfood/new", ({ "batchID": batchId, "listID": foodId, "userID": userId }))
      .then((response) => {// response is updatedUser
        delete response.data.password;
        console.log("collected! response is User Doc without password ", response)
        setIsCollected(true)
      })
      .catch((error) => {
        console.log("error", error)
        console.log("error response", error.response.data.error)
      })
    console.log("after axios")
  }

  if (isCollected === true) {
    return <Redirect to={"/myfood"} />
  }

  return (
    <Container fluid>
      <Row>
        <ItemDetailsShow foodData={foodDetails} />
      </Row>

      <Row>
        <Col>
          <Button onClick={handleCollect} style={{ margin: "10px 0" }}>
            Collect
          </Button>
        </Col>

        <Col>
          <Button
            href="/listings"
            style={{ margin: "10px 0" }} >
            Back
        </Button>
        </Col>

      </Row>
    </Container >
  );
};

export default OneItem;
