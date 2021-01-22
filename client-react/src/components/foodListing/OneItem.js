import React from "react";
import { useState, useEffect } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { Redirect, useParams, useHistory } from "react-router-dom";
import ItemDetailsShow from "./ItemDetailsShow";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const OneItem = () => {
  let { batchId, foodId } = useParams();
  const [foodDetails, setFoodDetails] = useState({});
  const [batchDetails, setBatchDetails] = useState({});
  const userId = sessionStorage.getItem("userId");
  const userType = sessionStorage.getItem("userType");
  const [isCollected, setIsCollected] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios.get(`/batch/${batchId}`).then((response) => {
      const batchData = response.data;
      console.log("batchData reponse.data", batchData);
      batchData.foodListings.forEach((foodItem) => {
        if (foodItem._id === foodId) {
          setFoodDetails(foodItem);
          return;
        }
      });
      setBatchDetails(batchData);
    });
  }, []);

  const handleCollect = () => {
    console.log("handling collect Click");
    axios
      .put("/user/collections/new", {
        batchID: batchId,
        listID: foodId,
        userID: userId,
      })
      .then((response) => {
        // response is updatedUser
        delete response.data.password;
        console.log(
          "collected! response is User Doc without password ",
          response
        );
        setIsCollected(true);
      })
      .catch((error) => {
        console.log("error", error);
        console.log("error response", error.response.data.error);
      });
    console.log("after axios");
  };

  if (isCollected === true) {
    return <Redirect to={"/collections"} />;
  }

  const collectBtn = (
    <Button
      onClick={handleCollect}
      style={{
        margin: "10px 10px 15px 10px",
        borderRadius: "20px",
        width: "150px",
      }}
      variant="success"
    >
      Collect
    </Button>
  );

  const toShowCollectBtnOrNot = userType === "Recipient" ? collectBtn : "";
  const linkToggle = (user) => {
    if (user === "Contributor") {
      return "/contributions";
    } else {
      return "/listings";
    }
  };
  return (
    <Container>
      <div className="oneItem">
        <div>
          <ItemDetailsShow foodData={foodDetails} batchData={batchDetails} />
        </div>

        <Row>
          <Col>{toShowCollectBtnOrNot}</Col>

          <Col>
            <Button
              // href={linkToggle(userType)}
              onClick={() => history.goBack()}
              style={{
                margin: "10px 0",
                borderRadius: "20px",
                border: "3px solid",
                fontWeight: "bold",
                width: "150px",
              }}
              variant="outline-warning"
            >
              Back
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default OneItem;
