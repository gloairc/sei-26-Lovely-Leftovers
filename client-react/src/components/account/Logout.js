import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Logout = (props) => {
    const [loggedOut, setLoggedOut] = useState(false)
    const setCurrentUser = props.updateUser

    axios.delete('/session')
        .then((response) => {
            setLoggedOut(true)
            setCurrentUser()
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })

    return (
        <h1>{loggedOut ? "Logged Out" : "Logout fail"}</h1>
    );
};

export default Logout;
