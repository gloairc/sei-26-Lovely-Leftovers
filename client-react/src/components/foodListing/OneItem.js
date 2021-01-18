import React from "react";
import { useState } from "react";
import { Form, FormControl, Button, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ItemDetailsTemplate from "./ItemDetailsTemplate";
import "bootstrap/dist/css/bootstrap.min.css";

const OneItem = () => {
  return (
    <Form>
      <ItemDetailsTemplate />
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
