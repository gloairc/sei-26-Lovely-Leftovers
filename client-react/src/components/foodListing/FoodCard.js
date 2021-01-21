import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Moment from "react-moment";
import { Link } from "react-router-dom";
// import "./style.css";
// https://bit.ly/3c4kYL1

const FoodCard = ({ foodData }) => {
  const isHalalTF = (foodData.isHalal === true) ? "Halal" : "";
  const isVegTF = (foodData.isVegetarian === true) ? "Vegetarian" : "";

  const longCatList = () => {
    const foodCat = (foodData.category);
    let catList = "";
    let finalCatList = "1243";
    for (let i = 0; i < ((foodCat).length) - 1; i++) {
      catList += ((foodCat)[i] + ", ")
    }
    finalCatList = catList + (foodCat)[foodCat.length - 1]
    console.log("finalCatList", finalCatList)
    return finalCatList
  }

  const foodCategories = ((foodData.category).length > 1) ? longCatList() : (foodData.category)


  return (
    <Card id="foodss">
      <span class="badge badge-success">{isVegTF}</span>
      <span class="badge badge-warning">{isHalalTF}</span>
      <Card.Img variant="top" src={foodData.imgFile} />
      {/*   "https://www.kindpng.com/picc/m/29-294916_food-donation-transparent-hd-png-download.png"*/}
      <Card.Body>
        <Card.Title
          style={{
            marginBottom: "15px",
            marginTop: "-15px",
            fontSize: "22px",
            textDecoration: "underline",
          }}
        >
          {foodData.title}
        </Card.Title>
        <div className="textWrap">
          <Card.Text style={{ marginBottom: "-1px" }}>
            Quantity: <span style={{ color: "blue" }}>{foodData.quantity}</span>
          </Card.Text>
          <Card.Text>
            Best Before: <span style={{ color: "red" }}>
              {foodData.bestBefore}
              {/* <Moment format="DD/MM/YYYY">{foodData.bestBefore}</Moment>{" "} */}
            </span>
            <footer class="blockquote-footer font-italic"><br />Category:  {foodCategories}</footer>
          </Card.Text>
          <Card.Link href={`/listings${foodData.queryPath}`}>
            <Button
              variant="outline-success"
              style={{ border: "3px solid", borderRadius: "20px" }}
            >
              View Listing
            </Button>
          </Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
