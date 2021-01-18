import React, { useState } from "react";
import FoodCard from "./FoodCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";

const FoodListing = (params) => {
  return (
    <>
      <h2>Food Listing</h2>
      <br />
      <Container>
        {/* change to use .map method later */}
        <Row>
          <Col>
            <FoodCard />
          </Col>
          <Col>
            <FoodCard />
          </Col>
          <Col>
            <FoodCard />
          </Col>
        </Row>
        <Row>
          <Col>
            <FoodCard />
          </Col>
          <Col>
            <FoodCard />
          </Col>
          <Col>
            <FoodCard />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FoodListing;
