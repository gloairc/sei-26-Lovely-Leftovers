import { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Logout = (props) => {
    const [loggedOut, setLoggedOut] = useState(false)

    axios.delete('/session')
        .then((response) => {
            setLoggedOut(true)
            sessionStorage.clear()
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })

    return (
        <h1>{loggedOut ? <Redirect to={'/about'} /> : "Logging out"}</h1>
    );
};

export default Logout;
