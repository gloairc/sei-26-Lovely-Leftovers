import { useState, useEffect } from "react";
import axios from "axios";
// import Joi from "joi";
import "./style.css";
import {
    Form,
    Button,
    FormLabel,
    FormControl,
    FormGroup,
    FormText,
    FormCheck,
    Row,
    Col,
    Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, Link, Redirect } from "react-router-dom";

const AccountDetailsForm = (props) => {
    const [formData, setFormData] = useState({
    })
    const [currentUsername, setCurrentUsername] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [sent, setSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const userId = useParams().id

    // validation is WIP
    // const formSchema = Joi.object({
    //     username: Joi.string().alphanum().min(8).required(),
    //     password: Joi.string().alphanum().min(8).required(),
    //     type: Joi.string().required(),
    //     firstName: Joi.string().regex(/^[a-zA-Z]{2}[a-zA-Z]+/).required(),
    //     lastName: Joi.string().required(),
    //     organisation: Joi.string().alphanum(),
    //     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    //     contactNum: Joi.string().length(8).regex(/^[0-9]{8}$/).required(),
    // })

    useEffect(() => {
        if (userId) {
            setIsLoading(true)
            axios.get(`/user/${userId}`)
                .then((response) => {
                    setFormData(response.data)
                    setCurrentUsername(response.data.username)
                    setIsLoading(false)
                    console.log(response)
                })
                .catch((error) => {
                    console.log('error', error)
                })
        } else {
            console.log('new user. no set data')
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedInfo = {
            username: formData.username,
            firstName: formData.firstName,
            familyName: formData.familyName,
            organisation: formData.organisation,
            contactNum: formData.contactNum,
            email: formData.email,
        };
        if (!userId) {
            axios
                .post("/user", formData)
                .then((response) => {
                    console.log(response);
                    sessionStorage.setItem("userId", response.data._id);
                    sessionStorage.setItem("userType", response.data.type);
                    setTimeout(() => {
                        setSent(true);
                    }, 2000);
                })
                .catch((error) => {
                    console.log("error", error.response.data.errors);
                    setErrorMsg(error.response.data.errors);
                });

            // validation WIP
            // const validate = formSchema.validate(formData, { abortEarly: false })
            // console.log(validate.error)
        } else if (userId) {
            axios
                .put(`/user/${userId}`, updatedInfo)
                .then((response) => {
                    setTimeout(() => {
                        setSent(true);
                    }, 2000);
                })
                .catch((error) => {
                    console.log("error", error.response.data.errors);
                    setErrorMsg(error.response.data.errors); // array of objects
                });
        }
    };

    if (sent && userId) {
        return <Redirect to={`/user/${userId}`
        } />
    }
    else if (sent && !userId) {
        return <Redirect to={'/listings'} />
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

    const handleBlur = (event) => {
        setErrorMsg("");
        axios.get('/user', {  // /user?username=formData.username
            params: { username: formData.username }
        })
            .then((response) => {// either receive the existing one user else or all users when username ===""
                console.log("axios then response", response.data)
                if ((response.data).length === 1 && formData.username !== currentUsername) {
                    setErrorMsg([{ msg: "Username already taken!" }])
                }
            })
    }

    const keyWidth = 2;
    const valueWidth = 5;
    const buffer = 1;

    return (
        <>
            <Row>
                <Col sm={buffer} />
                {errorMsg ? <Alert variant="danger">{showErrors()}</Alert> : ""}
                {isLoading ? <Alert variant="info">Loading your data...</Alert> : ""}
            </Row>
            <Form onSubmit={handleSubmit}>
                <FormGroup as={Row} controlId="type">
                    <Col sm={buffer} />
                    <FormLabel column sm={keyWidth}>User Type: </FormLabel>
                    {userId ? <p>{formData.type}</p> : <><FormCheck
                        inline label="Contributor"
                        type="radio"
                        value="Contributor"
                        name="type"
                        id="contributor"
                        onClick={(event) => setFormData((state) => {
                            return { ...state, type: event.target.value }
                        })}
                        checked={formData.type === "Contributor" && userId}
                        disabled={formData.type === "Recipient" && userId}
                    />
                        <FormCheck
                            inline label="Recipient"
                            type="radio"
                            value="Recipient"
                            name="type"
                            id="recipient"
                            onClick={(event) => setFormData((state) => {
                                return { ...state, type: event.target.value }
                            })
                            }
                            checked={formData.type === "Recipient" && userId}
                            disabled={formData.type === "Contributor" && userId}
                        /></>}
                </FormGroup>

                <FormGroup as={Row} controlId="username">
                    <Col sm={buffer} />
                    <FormLabel column sm={keyWidth}>
                        Username:
                                </FormLabel>
                    <Col sm={valueWidth}>
                        <FormControl
                            type="text"
                            value={formData.username}
                            disabled={isLoading}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, username: event.target.value }
                                })
                            }}
                            onBlur={(event) => handleBlur(event)}
                        />
                        <FormText className="text-muted">
                            Username must be at least 8 characters long
                            </FormText>
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="password">
                    <Col sm={buffer} />
                    <FormLabel column sm={keyWidth}>
                        Password:{" "}
                    </FormLabel>
                    <Col sm={valueWidth}>
                        <FormControl
                            type="Password"
                            value={userId ? "" : formData.password}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, password: event.target.value };
                                });
                            }}
                            disabled={userId}
                        />
                        <FormText className="text-muted">
                            Password must be at least 8 characters long
            </FormText>
                    </Col>
                    {userId ? (
                        <Col sm="2">
                            <Link to={`/user/${userId}/changepassword`}>
                                <Button
                                    variant="outline-warning"
                                    style={{
                                        borderRadius: "20px",
                                        width: "170px",
                                        border: "3px solid",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Change Password</Button>
                            </Link>
                        </Col>
                    ) : (
                            ""
                        )}
                </FormGroup>

                <FormGroup as={Row} controlId="firstName">
                    <Col sm={buffer} />
                    <FormLabel column sm={keyWidth}>First Name: </FormLabel>
                    <Col sm={valueWidth}>
                        <FormControl type="text"
                            value={formData.firstName}
                            disabled={isLoading}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, firstName: event.target.value }
                                })
                            }} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="familyName">
                    <Col sm={buffer} />
                    <FormLabel column sm={keyWidth}>Last Name: </FormLabel>
                    <Col sm={valueWidth}>
                        <FormControl type="text"
                            value={formData.familyName}
                            disabled={isLoading}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, familyName: event.target.value }
                                })
                            }} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="organisation">
                    <Col sm={buffer} />
                    <FormLabel column sm={keyWidth}>Organisation: </FormLabel>
                    <Col sm={valueWidth}>
                        <FormControl type="text"
                            value={formData.organisation}
                            disabled={isLoading}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, organisation: event.target.value }
                                })
                            }} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="contactNum">
                    <Col sm={buffer} />
                    <FormLabel column sm={keyWidth}>Contact Number: </FormLabel>
                    <Col sm={valueWidth}>
                        <FormControl type="number"
                            value={formData.contactNum}
                            disabled={isLoading}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, contactNum: event.target.value }
                                })
                            }} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="email">
                    <Col sm={buffer} />
                    <FormLabel column sm={keyWidth}>Email Address: </FormLabel>
                    <Col sm={valueWidth}>
                        <FormControl type="email"
                            value={formData.email}
                            disabled={isLoading}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, email: event.target.value }
                                })
                            }} />
                    </Col>
                </FormGroup>

                <Row>
                    <Col sm={buffer} />
                    <Col sm={keyWidth}>
                        <Button
                            variant="outline-success"
                            style={{
                                borderRadius: "20px",
                                width: "150px",
                                border: "3px solid",
                                fontWeight: "bold",
                            }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {userId ? "Save Changes" : "Create Account"}
                        </Button>
                    </Col>
                    {userId ? (
                        <>
                            <Col sm="1"></Col>
                            <Col>
                                <Link to={`/user/${userId}`}>Back to Account Details</Link>
                            </Col>
                        </>
                    ) : (
                            ""
                        )}
                </Row>
            </Form>
        </>
    );
};

export default AccountDetailsForm;
