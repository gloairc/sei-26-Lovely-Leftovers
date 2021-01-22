import { useState } from "react";
import axios from "axios";
import {
    Form,
    Button,
    FormLabel,
    FormControl,
    FormGroup,
    Row,
    Col,
    Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, Link, Redirect } from "react-router-dom";

const PasswordEdit = (props) => {
    const [formData, setFormData] = useState({})
    const [changeStatus, setChangeStatus] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [redirect, setRedirect] = useState(false)
    const userId = sessionStorage.getItem('userId')
    const userIdParam = useParams().id

    const handleSubmit = (event) => {
        event.preventDefault();
        setChangeStatus('Hang on, changing your password..')
        setErrorMsg()
        if (formData.password === formData.password2) {
            axios.put(`/user/${userId}`, { password: formData.password })
                .then((response) => {
                    console.log(response)
                    setChangeStatus('Password updated! Redirecting...')
                    setTimeout(() => {
                        setRedirect(true)
                    }, 2000);
                })
                .catch((error) => {
                    setErrorMsg(error.response.data.errors)
                })
        } else {
            setChangeStatus()
            setErrorMsg([{ msg: "Passwords don't match" }])
        }
    }

    const showErrors = () => {
        let errors = [];
        if (errorMsg) {
            errors.push(<p>Error!</p>);
            for (let i = 0; i < errorMsg.length; i++) {
                errors.push(<p>{errorMsg[i].msg}</p>);
            }
        }
        return errors;
    };

    if (redirect) {
        return <Redirect to={`/user/${userIdParam}`} />
    }

    const keyWidth = 3
    const valueWidth = 5
    const buffer = 1

    return (
        <>
            {userId === userIdParam ?
                <>
                    <div>
                        <h1>Change Password</h1>
                        <Row>
                            <Col sm={buffer} />
                            {changeStatus === 'Password updated! Redirecting...' ? <Alert variant="success">{changeStatus}</Alert> : ""}
                            {changeStatus === 'Hang on, changing your password..' ? <Alert variant="info">{changeStatus}</Alert> : ""}
                            {errorMsg ? <Alert variant="danger">{showErrors()}</Alert> : ""}
                        </Row>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup as={Row} controlId="newpassword1">
                                <Col sm={buffer} />
                                <FormLabel column sm={keyWidth}>
                                    Enter New Password:
                                        </FormLabel>
                                <Col sm={valueWidth}>
                                    <FormControl
                                        type="password"
                                        value={formData.password}
                                        onChange={(event) => {
                                            setFormData((state) => {
                                                return { ...state, password: event.target.value }
                                            })
                                        }} />
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} controlId="password2">
                                <Col sm={buffer} />
                                <FormLabel column sm={keyWidth}>
                                    Re-Enter New Password:{" "}
                                </FormLabel>
                                <Col sm={valueWidth}>
                                    <FormControl
                                        type="Password"
                                        value={formData.password2}
                                        onChange={(event) => {
                                            setFormData((state) => {
                                                return { ...state, password2: event.target.value };
                                            });
                                        }}
                                    />
                                </Col>
                            </FormGroup>

                            <Row>
                                <Col sm={buffer} />
                                <Button
                                    variant="success"
                                    style={{
                                        borderRadius: "20px",
                                        border: "3px solid",
                                        fontWeight: "bold",
                                        width: "150px",
                                    }}
                                    type="submit"
                                >
                                    Save Password
                                </Button>
                                <Col sm="1" />
                                <Col>
                                    <Link to={`/user/${userId}`}>
                                        <Button
                                            variant="outline-warning"
                                            style={{
                                                borderRadius: "20px",
                                                border: "3px solid",
                                                fontWeight: "bold",
                                                width: "150px",
                                            }}
                                        >
                                            Back to Account Details
                                        </Button>
                                    </Link>
                                </Col>
                                <Col sm="1"></Col>
                                <Col sm="1"></Col>
                                <Col sm="1"></Col>
                                <Col sm="1"></Col>
                            </Row>
                        </Form>
                    </div>
                </>
                :
                <Redirect to={"/restricted"} />
            }
        </>
    );
};
export default PasswordEdit;
