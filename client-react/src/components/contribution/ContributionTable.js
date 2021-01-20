import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css";
import axios from "axios";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const ContributionTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [deleted, setDeleted] = useState(false);

  //   const handleDelete = (id) => {
  //     axios.delete(`/pets/${id}`).then((response) => {
  //       setDeleted(true);
  //     });
  //   };

  useEffect(() => {
    axios.get("/batch").then((response) => {
      setTableData(response.data);
      setLoaded(true);
      console.log("response", response);
    });
  }, [loaded, deleted]);

  return (
    <div className="contributionTable">
      <div className="contributionTitle">
        <h2>My Contibutions</h2>
      </div>
      <Table
        striped
        bordered
        hover
        variant="dark"
        style={{ margin: "10px 2.5%" }}
      >
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((batch) => (
            <tr>
              <td>{batch._id}</td>
              <td>{batch.createdAt}</td>
              <td>
                {/* <DeleteForeverIcon onClick={() => handleDelete(subject._id)} /> */}
                {/* <Link to={`/batch/${batch._id}`}>
                  <EditIcon />
                </Link> */}
                <Link to={`/contributions/${batch._id}`}>View Items</Link>
                <br />
                <Link>Hide All</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ContributionTable;
