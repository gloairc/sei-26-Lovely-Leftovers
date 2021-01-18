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
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css";

const ItemDetailsTemplate = (props) => {
  //   const handleCreateUser = (event) => {
  //     event.preventDefault();
  //     axios.post("/users", formData).then((response) => {
  //       console.log("response", response);
  //       setCreated(true);
  //     });
  //   };

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

  //   const [created, setCreated] = useState(false);

  //   if (created) {
  //     return <Redirect to="/login" />;
  //   }

  return (
    <Container>
      <Row>
        <Col>
          Title:{" "}
          <FormControl
            type="text"
            title="title"
            value={formData.title}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Quantity:{" "}
          <FormControl
            type="number"
            title="quantity"
            value={formData.quantity}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Category:{" "}
          <FormControl
            type="text"
            title="category"
            value={formData.category}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Is this Halal?:{" "}
          <FormControl
            type="boolean"
            title="isHalal"
            value={formData.isHalal}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Is this vegetarian?:{" "}
          <FormControl
            type="boolean"
            title="isVegetarian"
            value={formData.isVegetarian}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Description:{" "}
          <FormControl
            type="text"
            title="description"
            value={formData.description}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Best Before Date:{" "}
          <FormControl
            type="text"
            title="bestBefore"
            value={formData.bestBefore}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Collection Address:{" "}
          <FormControl
            type="text"
            title="collectionAddress"
            value={formData.collectionAddress}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Contact Person:{" "}
          <FormControl
            type="text"
            title="contactName"
            value={formData.contactName}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          Contact Number:{" "}
          <FormControl
            type="number"
            title="contactNumber"
            value={formData.contactNumber}
            // onChange={(event) => {
            //   setFormData((state) => {
            //     return { ...state, username: event.target.value };
            //   });
            // }}
          />
        </Col>
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

export default ItemDetailsTemplate;
