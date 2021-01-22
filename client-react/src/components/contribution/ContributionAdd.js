import React from "react";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
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
import "./style.css";

const ContributionAdd = () => {
  const userId = sessionStorage.getItem("userId");
  const [foodList, setFoodList] = useState([{}]);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const [inputFoodArray, setInputFoodArray] = useState([
    <Card foodIndex={0} style={{ boxShadow: "3px 3px 10px #cdeac0" }}>
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
    contactPerson: "",
    contactNum: 0,
    collectionAddress: "",
    foodListings: foodList,
  });

  useEffect(() => {
    axios.get(`/user/${userId}`).then((response) => {
      const newBatch = batchDetails;
      newBatch.contactPerson = `${response.data.firstName} ${response.data.familyName}`;
      newBatch.contactNum = response.data.contactNum;
      setBatchDetails(newBatch);
      setDetailsLoaded(true);
    });
  }, [detailsLoaded]);

  const [dataPosted, setDataPosted] = useState(false);

  const [batchCreated, setBatchCreated] = useState(false); // to redirect after creation
  const handleNewBatch = (event) => {
    event.preventDefault();
    axios.post("/batch", batchDetails).then((response) => {
      setBatchCreated(true);
      console.log(response);
      const contributionData = { userID: userId, batchID: response.data._id };
      axios
        .put("/user/contributions/new", contributionData)
        .then((response) => {
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
    <div className="newContainer">
      <Form onSubmit={handleNewBatch}>
        <Container
          style={{
            boxShadow: "3px 3px 10px #cdeac0",
            width: "100%",
            background: "rgba(255,255,255,0.8)",
          }}
        >
          <div style={{ margin: "10px" }}>
            <h2>Add a New Contribution</h2>
          </div>
          <Row>
            <Col>Contact Person: </Col>
            <Col>{batchDetails.contactPerson}</Col>
            <Col lg={8} md={6} />
          </Row>
          <Row>
            <Col>Contact Number: </Col>
            <Col>{batchDetails.contactNum}</Col>
            <Col lg={8} md={6} />
          </Row>
          <Row>
            <Col lg={2} md={6}>
              Collection Address:
            </Col>
            <Col lg={6} md={6}>
              <FormControl
                type="text"
                title="collectionAddress"
                onChange={(event) => {
                  setBatchDetails((state) => {
                    return { ...state, collectionAddress: event.target.value };
                  });
                }}
              />
            </Col>
            <Col lg={4} md={6} />
          </Row>
          <Row>
            <Col lg={8} md={6}>
              <Accordion>{inputFoodArray}</Accordion>
            </Col>
          </Row>
          <Row style={{ display: "flex" }}>
            <Col xs={10} />
            <Col>
              <div className="tools">
                <div className="buttonBox">
                  <Button
                    style={{
                      width: "40px",
                      borderRadius: "25px",
                      border: "3px solid",
                      fontWeight: "bold",
                      boxShadow: "3px 3px 10px #cdeac0",
                    }}
                    variant="outline-success"
                    onClick={() => handleAddNewItem()}
                  >
                    +
                  </Button>
                  <p className="buttonTxt">Add Food Item</p>
                </div>
                <div className="buttonBox">
                  <Button
                    style={{
                      width: "40px",
                      borderRadius: "25px",
                      border: "3px solid",
                      fontWeight: "bold",
                      boxShadow: "3px 3px 10px #cdeac0",
                    }}
                    variant="outline-danger"
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
                  <p
                    className="buttonTxt"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    Remove Last Item
                  </p>
                </div>
                <div>
                  <Button
                    type="submit"
                    style={{
                      margin: "10px 0",
                      boxShadow: "5px 3px 10px #cdeac0",
                      borderRadius: "25px",
                      height: "40px",
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
};

export default ContributionAdd;
