import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ContributionTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const userId = sessionStorage.getItem("userId");

  const handleHide = (batch) => {
    console.log("handling Hide");
    axios
      .put("/batch/sdeletebatch", {
        batchID: batch,
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

  useEffect(() => {
    axios.get(`/user/${userId}`).then((response) => {
      const contributedList = [...response.data.contributedList];
      axios.get("/batch").then((batchResponse) => {
        contributedList.map((contributedId) => {
          batchResponse.data.map((batch) => {
            if (contributedId === batch._id) {
              console.log(contributedId);
              console.log(batch._id);
              console.log(batch);
              const newList = tableData;
              newList.push(batch);
              setTableData(newList);
              return batch;
            }
          });
        });
        setLoaded(true);
      });
    });
  }, [loaded, deleted]);

  return (
    <div className="contributionTable">
      <div className="contributionTitle">
        <h2>My Contributions</h2>
      </div>
      <Table
        striped
        bordered
        hover
        variant="light"
        style={{
          width: "90%",
          margin: "10px auto",
          boxShadow: "5px 5px 15px #cdeac0",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "35%" }}>Batch ID</th>
            <th style={{ width: "35%" }}>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            <>
              {tableData.map((batch) => (
                <tr>
                  <td>{batch._id}</td>
                  <td>{batch.createdAt}</td>
                  <td>
                    <Link to={`/contributions/${batch._id}`}>
                      <Button
                        variant="outline-success"
                        style={{
                          borderRadius: "20px",
                          border: "3px solid",
                          width: "120px",
                          margin: "0 5px",
                          fontWeight: "bold",
                        }}
                      >
                        View Items
                      </Button>
                    </Link>

                    <Link>
                      <Button
                        onClick={() => {
                          handleHide(batch._id);
                        }}
                        variant="outline-danger"
                        style={{
                          borderRadius: "20px",
                          border: "3px solid",
                          width: "120px",
                          margin: "0 5px",
                          fontWeight: "bold",
                        }}
                      >
                        {batch.status === "hidden" ? "Hidden" : "Hide All"}
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <></>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ContributionTable;
