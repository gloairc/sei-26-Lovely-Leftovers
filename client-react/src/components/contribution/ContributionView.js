import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ContributionTable = () => {
  let { batchId, foodId } = useParams();
  const [batchData, setBatchData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios.get(`/batch/${batchId}`).then((response) => {
      setBatchData(response.data);
      setDataLoaded(true);
    });
  }, [dataLoaded]);

  const handleHide = (id) => {
    console.log("handling Hide");
    axios
      .put("/batch/sdeletelist", {
        batchID: batchId,
        listID: id,
      })
      .then((response) => {
        console.log("Item Hidden", response);
      })
      .catch((error) => {
        console.log("error", error);
        console.log("error response", error.response.data.error);
      });
    console.log("after axios");
  };

  return (
    <div className="contributionTable">
      <div className="contributionTitle">
        <h2>Batch {batchData._id}</h2>
      </div>

      <Table
        striped
        bordered
        hover
        variant="light"
        style={{ boxShadow: " 5px 5px 15px  #cdeac0" }}
      >
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Best Before</th>
            <th>Status</th>
            <th>Recipient</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataLoaded ? (
            <>
              {batchData.foodListings.map((foodItem) => (
                <tr>
                  <td>{foodItem.title}</td>
                  <td>{foodItem.quantity}</td>
                  <td>{foodItem.bestBefore}</td>
                  <td>{foodItem.status}</td>
                  <td>{foodItem.recipient}</td>
                  <td>
                    <Link to={`/listings/${batchData._id}/${foodItem._id}`}>
                      <Button
                        variant="outline-success"
                        style={{
                          borderRadius: "20px",
                          margin: "0 5px",
                          border: "3px solid",
                          fontWeight: "bold",
                        }}
                      >
                        View
                      </Button>
                    </Link>
                    <Link>
                      <Button
                        onClick={() => {
                          handleHide(foodItem._id);
                        }}
                        variant="outline-danger"
                        style={{
                          borderRadius: "20px",
                          margin: "0 5px",
                          border: "3px solid",
                          fontWeight: "bold",
                        }}
                      >
                        {foodItem.status === "hidden" ? "Hidden" : "Hide"}
                      </Button>
                    </Link>
                    <br />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <></>
          )}
        </tbody>
      </Table>

      <Row>
        <Col></Col>

        <Col>
          <Button
            onClick={() => history.goBack()}
            variant="outline-warning"
            href="/contributions"
            style={{
              margin: "10px 0",
              borderRadius: "20px",
              border: "3px solid",
              fontWeight: "bold",
              width: "150px",
            }}
          >
            Back
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ContributionTable;
