import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import testImg from "../../images/can-food.jpg";
// import "./style.css";

const FoodCard = ({ data }) => {
  const [formData, setFormData] = useState({
    title: "Food item 1",
    quantity: 5,
    category: "Canned stuff",
    isHalal: true,
    isVegetarian: false,
    description: "This is a can of food",
    bestBefore: "10/03/2666",
    collectionAddress: "Middle of nowhere Road",
    contactName: "Some Guy",
    contactNumber: "666666",
  });

  return (
    <Card style={{ width: "18rem" }} className="w-50">
      <Card.Img variant="top" src={testImg} />
      <Card.Body>
        <Card.Title>
          {formData.title} ({formData.quantity})
        </Card.Title>
        <Card.Text>{formData.bestBefore}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
