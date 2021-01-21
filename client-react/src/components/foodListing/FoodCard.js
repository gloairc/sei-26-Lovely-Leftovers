import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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

    <Card style={{ width: "18rem" }} className="w-25">
      {/* {foodData.title} ({foodData.quantity}) */}
      <span class="badge badge-success">{isVegTF}</span>
      <span class="badge badge-warning">{isHalalTF}</span>
      <Card.Img variant="top" src="" />
      <Card.Body>

        <Card.Title>
          <Link to={"/listings" + foodData.queryPath}>
            {foodData.title} ({foodData.quantity}) </Link>
        </Card.Title>
        <Card.Text>
          Best Before: {foodData.bestBefore}
          {/* <Moment format="DD/MM/YYYY">{foodData.bestBefore}</Moment>{" "} */}
        </Card.Text>
        <Card.Text>
          <p class="font-italic"> {foodCategories}</p>
        </Card.Text>
      </Card.Body>
    </Card>

  );
};

export default FoodCard;
