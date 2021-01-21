import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Moment from "react-moment";
import axios from "axios";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const ContributionTable = () => {
  let { batchId } = useParams();
  const [batchData, setBatchData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    axios.get(`/batch/${batchId}`).then((response) => {
      setBatchData(response.data);
      setDataLoaded(true);
    });
  }, [dataLoaded]);

  return (
    <>
      <h2>Batch {batchData._id}</h2>
      {console.log(batchData)}
      <Table
        striped
        bordered
        hover
        variant="dark"
        style={{ margin: "10px 2.5%" }}
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
                  <td>
                    <Moment format="DD/MM/YYYY">{foodItem.bestBefore}</Moment>
                  </td>
                  <td>{foodItem.status}</td>
                  <td>{foodItem.recipient}</td>
                  <td>
                    <Link to={`/listings/${batchData._id}/${foodItem._id}`}>
                      View
                    </Link>
                    <br />
                    <Link>Hide</Link>
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
          <Button href="/contributions" style={{ margin: "10px 0" }}>
            Back
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ContributionTable;
