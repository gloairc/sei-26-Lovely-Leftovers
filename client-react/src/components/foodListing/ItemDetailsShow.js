import React from "react";
import { useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css";

const ItemDetailsShow = ({ foodData, batchData }) => {
  const [category, setcategory] = useState([]);
  //   const handleCreateUser = (event) => {
  //     event.preventDefault();
  //     axios.post("/users", formData).then((response) => {
  //       console.log("response", response);
  //       setCreated(true);
  //     });
  //   };
  console.log("fooddata", foodData);
  console.log("batchData", batchData)

  const IsHalalTF = (foodData.isHalal === true) ? "Yes" : "No";
  const IsVegTF = (foodData.isVegetarian === true) ? "Yes" : "No"

  const longCatList = () => {
    const foodCat = (foodData.category);
    let catList = "";
    let finalCatList = "";
    for (let i = 0; i < ((foodCat).length) - 1; i++) {
      catList += ((foodCat)[i] + ", ")
    }
    finalCatList = catList + (foodCat)[foodCat.length - 1]
    // console.log("finalCatList", finalCatList)
    return finalCatList
  }

  const foodCategories = ((foodData.category).length > 1) ? longCatList() : (foodData.category)


  return (
    <Container>
      <Row>
        <Col><p><span class="font-weight-bold">Title: </span>{foodData.title}</p></Col>
      </Row>

      <Row>
        <Col><p><span class="font-weight-bold">Quantity: </span>{foodData.quantity}<span> x {foodData.weight}{foodData.unit}</span></p></Col>
      </Row>
      {/* 
      <Row>
        <Col><p><span class="font-weight-bold">Category: </span>{foodCategories}</p></Col>
      </Row> */}

      <Row>
        <Col><p><span class="font-weight-bold">Halal? </span> {IsHalalTF}</p></Col>
      </Row>

      <Row>
        <Col><p><span class="font-weight-bold">Vegetarian? </span> {IsVegTF}</p></Col>
      </Row>

      <Row>
        <Col><p><span class="font-weight-bold">Description: </span>{foodData.description}</p></Col>
      </Row>

      <Row>
        <Col>
          <p><span class="font-weight-bold"> Best Before Date: </span>{foodData.bestBefore}</p>
          {/* <Moment format="DD/MM/YYYY"> {foodData.bestBefore}</Moment> */}
        </Col>
      </Row>

      <Row>
        <Col> <p><span class="font-weight-bold">Collection Address: </span>{batchData.collectionAddress}</p></Col>
      </Row>

      <Row>
        <Col> <p><span class="font-weight-bold">Contact Person: </span> {batchData.contactPerson}</p></Col>
      </Row>

      <Row>
        <Col> <p><span class="font-weight-bold">Contact Number: </span>{batchData.contactNum}</p></Col>
      </Row>

      {/* <Row>
            <Col>
              <Button type="submit" style={{ margin: "10px 0" }}>
                Create Account
              </Button>
            </Col>
          </Row> */}
    </Container>
  );
};

export default ItemDetailsShow;
