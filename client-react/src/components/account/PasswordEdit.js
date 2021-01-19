import { useState } from 'react'
import axios from 'axios'
import { Form, Button, FormLabel, FormControl, FormGroup, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link } from 'react-router-dom';

const PasswordEdit = () => {
    const [formData, setFormData] = useState({})
    const userId = useParams().id

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData.password2)
        if (formData.password === formData.password2) {
            axios.put(`/user/${userId}`, { password: formData.password })
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log('error', error)
                })
        } else {
            console.log("password don't match")
        }
    }

    return (
        <>
            <h1>Change Password</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup as={Row} controlId="newpassword1">
                    <FormLabel column sm="3">
                        Enter New Password:
                                </FormLabel>
                    <Col sm="6">
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
                    <FormLabel column sm="3">Re-Enter New Password: </FormLabel>
                    <Col sm="6">
                        <FormControl type="Password"
                            value={formData.password2}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, password2: event.target.value }
                                })
                            }} />
                    </Col>
                </FormGroup>

                <Button variant="primary" type="submit">
                    Save Password
                </Button>
            </Form>
        </>
    )
}
export default PasswordEdit;
