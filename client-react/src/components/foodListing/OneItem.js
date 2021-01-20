import React from "react";
import { useState, useEffect } from "react";
import { Form, FormControl, Button, Row, Col } from "react-bootstrap";
import { Redirect, useParams } from "react-router-dom";
import ItemDetailsShow from "./ItemDetailsShow";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const OneItem = () => {
  let { batchId, foodId } = useParams();
  const [foodDetails, setFoodDetails] = useState({});

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

  return (
    <Form>
      <ItemDetailsShow foodData={foodDetails} />
      <Row>
        <Col>
          <Button type="submit" style={{ margin: "10px 0" }}>
            Collect
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default OneItem;
