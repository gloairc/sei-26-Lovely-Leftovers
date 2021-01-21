import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Account = () => {
    const [formData, setFormData] = useState({})

    const userId = sessionStorage.getItem('userId')

    useEffect(() => {
        axios.get(`/user/${userId}`)
            .then((response) => {
                setFormData(response.data)
                console.log(response)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }, [])

    const keyWidth = 2
    const valueWidth = 5
    const buffer = 1

    return (
        <>
            <div>
                <h1>Account Details</h1>
                <Row>
                    <Col sm={buffer}></Col>
                    <Col sm={keyWidth}>Account Type: </Col>
                    <Col sm={valueWidth}>{formData.type}</Col>
                </Row>
                <Row>
                    <Col sm={buffer}></Col>
                    <Col sm={keyWidth}>First Name: </Col>
                    <Col sm={valueWidth}>{formData.firstName}</Col>
                </Row>
                <Row>
                    <Col sm={buffer}></Col>
                    <Col sm={keyWidth}>Family Name: </Col>
                    <Col sm={valueWidth}>{formData.familyName}</Col>
                </Row>
                <Row>
                    <Col sm={buffer}></Col>
                    <Col sm={keyWidth}>Organisation: </Col>
                    <Col sm={valueWidth}>{formData.organisation}</Col>
                </Row>
                <Row>
                    <Col sm={buffer}></Col>
                    <Col sm={keyWidth}>Contact Number: </Col>
                    <Col sm={valueWidth}>{formData.contactNum}</Col>
                </Row>
                <Row>
                    <Col sm={buffer}></Col>
                    <Col sm={keyWidth}>Email Address: </Col>
                    <Col sm={valueWidth}>{formData.email}</Col>
                </Row>
                <Row>
                    <Col sm={buffer}></Col>
                    <Link to={`/user/${userId}/edit`}>Edit Profile</Link>
                    <Col sm="1"></Col>
                    <Link to={`/user/${userId}/changepassword`}>Change Password</Link>
                    <Col sm="1"></Col>
                    <Link to={`/user/${userId}/delete`}>Delete Account</Link>
                </Row>
            </div>
        </>
    )
}

export default Account;