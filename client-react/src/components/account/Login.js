import { useState } from 'react'
import axios from 'axios'
import Joi from 'joi'
import { Form, Button, FormLabel, FormControl, FormGroup, FormText, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const setCurrentUser = props.updateUser

    // const [errorMsg, setErrorMsg] = useState({})

    const [loginStatus, setLoginStatus] = useState(false)

    const formSchema = Joi.object({
        username: Joi.string().alphanum().min(8).required(),
        password: Joi.string().alphanum().min(8).required(),
    })

    // const handleBlur = (event) => {
    //     const test = event.target.id
    //     const validate = formSchema.validate({ [test]: formData[test], abortEarly: false })
    //     setErrorMsg((state) => { return { ...state, [test]: validate.error.message } })
    // }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/session', formData)
            .then((response) => {
                if (response.data._id) {
                    setCurrentUser(response.data)
                }
                setLoginStatus(true)
                // setUserId(response.data.id) // set userId
                // console.log(response.data) // response.data is the user document
            })
            .catch((error) => {
                // setLoginStatus(error.message) // error depends on status from backend (e.g. 400/401)
                console.log(error.response.data.error) // custom message from backend
            })
    }

    if (loginStatus) {
        return <Redirect to={`/user/${props.user._id}`} />
    }

    return (
        <>
            <h1>Log In</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup as={Row} controlId="username">
                    <FormLabel column sm="3">
                        Username:
                                    </FormLabel>
                    <Col sm="6">
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
                        {/* {errorMsg["username"] ? <h1>{errorMsg["username"]}</h1> : ''} */}
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="password">
                    <FormLabel column sm="3">Password: </FormLabel>
                    <Col sm="6">
                        <FormControl type="Password"
                            value={formData.password}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, password: event.target.value }
                                })
                            }} />
                        <FormText className="text-muted">Password must be at least 8 characters long</FormText>
                    </Col>
                    {/* {errorMsg} */}
                </FormGroup>
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
            {/* {loginStatus} */}
        </>
    )
}

export default Login;