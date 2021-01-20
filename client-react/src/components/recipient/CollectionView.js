import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const CollectionTable = () => {
//   let { batchId } = useParams();
  const [userData, setUserData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const userId = sessionStorage.getItem('userId')

  useEffect(() => {
    axios.get(`/user/${userId}`).then((response) => {
        setUserData(response.data);
        // axios.get(`/user/${userId}`).then((response) => {

        // }
        ))




      setDataLoaded(true);
    });
  }, [dataLoaded]);

  return (
    <div className="contributionTable">
      <div className="contributionTitle">
        <h2>Batch {batchData._id}</h2>
        {console.log(batchData)}
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
            <th>Item</th>
            <th>Quantity</th>
            <th>Contributor</th>
          </tr>
        </thead>
        <tbody>
          {dataLoaded ? (
            <>
              {setUserData.receivedList.map((foodItem) => (
                <tr>
                  <td>{foodItem.title}</td>
                  <td>{foodItem.quantity}</td>
                  <td>{foodItem.bestBefore}</td>
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
    </div>
  );
};

export default CollectionTable;
