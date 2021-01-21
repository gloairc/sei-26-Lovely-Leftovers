import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Moment from "react-moment";
import { Link } from "react-router-dom";
// import "./style.css";
// https://bit.ly/3c4kYL1

const FoodCard = ({ foodData }) => {
  // const [categoryList, setCategoryList] = useState("");
  const isHalalTF = (foodData.isHalal === true) ? "Halal" : "";
  const isVegTF = (foodData.isVegetarian === true) ? "Vegetarian" : "";


  //taking out food category from array called foodData.category
  // const gettingCat = () => {
  //   const foodCat = (foodData.category);
  //   if (foodCat.length > 1) {
  //     let catList = "";
  //     let finalCatList = "";
  //     for (let i = 0; i < ((foodCat).length) - 1; i++) {
  //       catList += ((foodCat)[i] + ", ")
  //     }
  //     finalCatList = catList + (foodCat)[foodCat.length - 1]
  //     setCategoryList(finalCatList)
  //     return categoryList
  //   } else {
  //     return "foodCat"
  //   }
  // }

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
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title
          style={{
            marginBottom: "25px",
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
            Best Before:
            <span style={{ color: "red" }}>
              {foodData.bestBefore}
              {/* <Moment format="DD/MM/YYYY">{foodData.bestBefore}</Moment>{" "} */}
            </span>
          </Card.Text>
          <Card.Text>
            <p class="font-italic"> {foodCategories}</p>
          </Card.Text>
          <Card.Link href={`/listings${foodData.queryPath}`}>
            View Listing
          </Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
