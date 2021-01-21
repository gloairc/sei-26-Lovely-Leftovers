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
import { Redirect, useParams, Prompt } from "react-router-dom";
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

    // <div index={0}>
    //   <h3>Food Item {1}</h3>
    //   <ItemDetailsAdd
    //     foodList={foodList}
    //     foodIndex={0}
    //     setFoodList={() => setFoodList()}
    //   />
    //   <br />

    //   <br />
    //   <p>===================================================</p>
    // </div>,
    //     {/* <Button onClick={() => handleRemoveItem()}>-</Button> */}
  ]);

  const [batchDetails, setBatchDetails] = useState({
    contactPerson: "mitch test data",
    contactNum: 12345678,
    collectionAddress: "666 Middle of Nowhere Road",
    foodListings: foodList,
  });
  const [dataPosted, setDataPosted] = useState(false);

  //test data
  // const [batchDetails, setBatchDetails] = useState({
  //   contactPerson: "test data",
  //   contactNum: 12345678,
  //   collectionAddress: "-10 Anson Avenue",
  //   foodListings: [
  //     {
  //       title: "Mango",
  //       quantity: 50,
  //       category: ["fruit"],
  //       isHalal: true,
  //       isVegetarian: true,
  //       description: "Yellow Juicy Yummy",
  //       bestBefore: Date.now(),
  //     },
  //     {
  //       title: "Jackfruit",
  //       quantity: 44,
  //       category: ["fruit"],
  //       isHalal: true,
  //       isVegetarian: true,
  //       description: "Juicy nice cool Crunchy",
  //       bestBefore: Date.now(),
  //     },
  //     {
  //       title: "Durian",
  //       quantity: 99,
  //       category: ["fruit"],
  //       isHalal: true,
  //       isVegetarian: true,
  //       description: "Not fresh",
  //       bestBefore: Date.now(),
  //     },
  //   ],
  // });

  const [batchCreated, setBatchCreated] = useState(false); // to redirect after creation
  const handleNewBatch = (event) => {
    event.preventDefault();
    // setBatchDetails()
    axios.post("/batch", batchDetails).then((response) => {
      setBatchCreated(true);
      console.log(response);
      const contributionData = { userID: userId, batchID: response.data._id };
      axios.put("/user/addtoclist", contributionData).then((response) => {
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

      // <div foodIndex={inputFoodArray.length}>
      //   <h3>Food Item {inputFoodArray.length + 1}</h3>
      //   <ItemDetailsAdd
      //     key={"foodIndex" + inputFoodArray.length}
      //     foodList={foodList}
      //     foodIndex={inputFoodArray.length}
      //     setFoodList={() => setFoodList()}
      //   />
      //   <br />
      //   {/* <div>
      //     Remove Item
      //     <Button
      //       onClick={(event) => handleRemoveItem(parseInt(event.foodIndex))}
      //     >
      //       -
      //     </Button>
      //   </div> */}
      //   <br />
      //   <p>===================================================</p>
      // </div>
      //     {/* <Button onClick={() => handleRemoveItem()}>-</Button> */}
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
        }}
        style={{ margin: "10px 0" }}
      >
        check batchDetails
      </Button> */}
    </>
  );
};

export default ContributionAdd;
