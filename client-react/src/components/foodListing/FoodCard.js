import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import testImg from "../../images/can-food.jpg";
import Moment from "react-moment";
import { Link } from "react-router-dom";
// import "./style.css";

const FoodCard = ({ foodData }) => {
  return (
    <Link to={"/listings" + foodData.queryPath}>
      <Card style={{ width: "18rem" }} className="w-25">
        {foodData.title} ({foodData.quantity})
        <Card.Img variant="top" src={testImg} />
        <Card.Body>
          <Card.Title>
            {foodData.title} ({foodData.quantity})
          </Card.Title>
          <Card.Text>
            Best Before:
            <Moment format="DD/MM/YYYY">{foodData.bestBefore}</Moment>{" "}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default FoodCard;
