import { Redirect } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Logout = (props) => {
    axios.delete('/session')
        .then((response) => {
            sessionStorage.clear()
            console.log(response)
        }).then(() => {
            props.setLoggedIn(false)
        })
        .catch((error) => {
            console.log(error)
        })

    return (
        <>
            {!props.loggedIn ? <Redirect to={'/about'} /> : <h1>"Logging out"</h1>}
        </>
    );
};

export default Logout;
