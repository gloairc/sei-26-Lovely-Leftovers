import { useState } from 'react'
import axios from 'axios'
import Joi from 'joi'
import { Form, Button, FormLabel, FormControl, FormGroup, FormText, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState();

    const [loginStatus, setLoginStatus] = useState(false);

    const [status, setStatus] = useState();
    // const formSchema = Joi.object({
    //     username: Joi.string().alphanum().min(8).required(),
    //     password: Joi.string().alphanum().min(8).required(),
    // });

    // const handleBlur = (event) => {
    //     const test = event.target.id
    //     const validate = formSchema.validate({ [test]: formData[test], abortEarly: false })
    //     setErrorMsg((state) => { return { ...state, [test]: validate.error.message } })
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus("logging in");
        axios
            .post("/session", formData)
            .then((response) => {
                if (response.data._id) {
                    sessionStorage.setItem("userId", response.data._id);
                    sessionStorage.setItem("userType", response.data.type);
                    setLoginStatus(true);
                    props.setLoggedIn(true);
                }
            })
            .catch((error) => {
                // setLoginStatus(error.message) // error depends on status from backend (e.g. 400/401)
                setStatus("");
                setErrorMsg(error.response.data.error); // custom message from backend
                console.log(error.response.data);
            });
    };

    if (loginStatus) {
        return <Redirect to={"/listings"} />;
    }

    const keyWidth = 2;
    const valueWidth = 5;
    const buffer = 1;

    return (
        <div className="login">
            <div className="title">
                <h1>Log In</h1>
            </div>
            <div className="loginForm">
                <Row>
                    <Col sm={buffer} />
                    {errorMsg ? <Alert variant="danger">Error! {errorMsg}</Alert> : ""}
                </Row>
                <Form onSubmit={handleSubmit}>
                    <FormGroup as={Row} controlId="username">
                        <Col sm={buffer} />
                        <FormLabel column sm={keyWidth}>
                            Username:
                                    </FormLabel>
                        <Col sm={valueWidth}>
                            <FormControl
                                type="text"
                                value={formData.username}
                                onChange={(event) => {
                                    console.log(event.target.id)
                                    setFormData((state) => {
                                        return { ...state, username: event.target.value }
                                    })
                                }}
                            />
                            <FormText className="text-muted">
                                Username must be at least 8 characters long
                                </FormText>
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row} controlId="password">
                        <Col sm={buffer} />
                        <FormLabel column sm={keyWidth}>Password: </FormLabel>
                        <Col sm={valueWidth}>
                            <FormControl type="Password"
                                value={formData.password}
                                onChange={(event) => {
                                    setFormData((state) => {
                                        return { ...state, password: event.target.value }
                                    })
                                }} />
                            <FormText className="text-muted">Password must be at least 8 characters long</FormText>
                        </Col>
                    </FormGroup>
                    <Row>
                        <Col sm={buffer} />
                        <Col sm={keyWidth}>
                            <Button variant="primary" type="submit">
                                Log In
                        </Button>
                        </Col>
                        <Col sm='3'>{status === 'logging in' ? 'Logging in, please wait..' : ""}</Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default Login;
