import React from "react";
import { useState, useEffect } from "react";
import { Form, FormControl, Button, Row, Col } from "react-bootstrap";
import { Redirect, useParams } from "react-router-dom";
import ItemDetailsTemplate from "./ItemDetailsTemplate";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const OneItem = () => {
  let { batchId, foodId } = useParams();
  const [foodDetails, setFoodDetails] = useState({});

  useEffect(() => {
    axios.get(`/batch/${batchId}/listing/${foodId}`).then((response) => {
      setFoodDetails(response.data);
    });
  }, []);

  return (
    <Form>
      <ItemDetailsTemplate foodData={foodDetails} />
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
