import React from "react";
import { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Accordion,
  Card,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ItemDetailsAdd from "../foodListing/ItemDetailsAdd";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ContributionAdd = () => {
  const userId = sessionStorage.getItem("userId");
  const [foodList, setFoodList] = useState([{}]);
  const [inputFoodArray, setInputFoodArray] = useState([
    <Card foodIndex={0}>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          Food Item {1} (Click to expand)
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <ItemDetailsAdd
            key={"foodIndex" + 0}
            foodList={foodList}
            foodIndex={0}
            setFoodList={() => setFoodList()}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>,
  ]);

  const [batchDetails, setBatchDetails] = useState({
    contactPerson: "mitch test data",
    contactNum: 12345678,
    collectionAddress: "666 Middle of Nowhere Road",
    foodListings: foodList,
  });
  const [dataPosted, setDataPosted] = useState(false);

  const [batchCreated, setBatchCreated] = useState(false); // to redirect after creation
  const handleNewBatch = (event) => {
    event.preventDefault();
    axios.post("/batch", batchDetails).then((response) => {
      setBatchCreated(true);
      console.log(response);
      const contributionData = { userID: userId, batchID: response.data._id };
      axios.put("/user/contributions/new", contributionData).then((response) => {
        setDataPosted(true);
      });
    });
  };

  if (dataPosted) {
    return <Redirect to={"/contributions"} />;
  }

  const handleAddNewItem = () => {
    setInputFoodArray([
      ...inputFoodArray,
      <Card foodIndex={inputFoodArray.length}>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey={inputFoodArray.length}
          >
            Food Item {inputFoodArray.length + 1} (Click to expand)
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={inputFoodArray.length}>
          <Card.Body>
            <ItemDetailsAdd
              key={"foodIndex" + inputFoodArray.length}
              foodList={foodList}
              foodIndex={inputFoodArray.length}
              setFoodList={() => setFoodList()}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>,
    ]);
    console.log("item added");
  };
  const handleRemoveItem = (index) => {
    console.log("item removed");
    const list = [...inputFoodArray];
    list.pop();
    setInputFoodArray(list);
    const updateBatch = batchDetails;
    updateBatch.foodListings.pop();
    setBatchDetails(updateBatch);
  };

  return (
    <>
      <h2>Add a New Contribution</h2>
      <Form onSubmit={handleNewBatch}>
        <Container>
          <Row>
            <Col>
              <Accordion>{inputFoodArray}</Accordion>
            </Col>
            <Col>
              <div>
                Add Food Item
                <Button onClick={() => handleAddNewItem()}>+</Button>
              </div>
              <div>
                Remove Last Item
                <Button
                  id="removeItem"
                  onClick={() => {
                    if (inputFoodArray.length > 1) {
                      handleRemoveItem(inputFoodArray.length - 1);
                    } else {
                      document.getElementById("removeItem").count = alert(
                        "Must have at least 1 Food Item"
                      );
                    }
                  }}
                >
                  -
                </Button>
              </div>

              <Button type="submit" style={{ margin: "10px 0" }}>
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
      {/* below is for test and troubleshooting only */}
      {/* <Button
        type="button"
        onClick={() => {
          console.log(batchDetails);
          let dateFormat = new Date(Date.now()).toLocaleDateString("en-SG");
          console.log(dateFormat);
        }}
        style={{ margin: "10px 0" }}
      >
        check batchDetails
      </Button> */}
    </>
  );
};

export default ContributionAdd;
