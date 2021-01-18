import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import testImg from "../../images/can-food.jpg";
// import "./style.css";

const FoodCard = ({ foodData }) => {
  return (
    <Card style={{ width: "18rem" }} className="w-50">
      {foodData.title} ({foodData.quantity})
      <Card.Img variant="top" src={testImg} />
      <Card.Body>
        <Card.Title>
          {foodData.title} ({foodData.quantity})
        </Card.Title>
        <Card.Text>{foodData.bestBefore}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
