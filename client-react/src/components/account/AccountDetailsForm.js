import { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi";
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
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, Link, Redirect } from "react-router-dom";

const AccountDetailsForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    username: "",
    password: "",
    firstName: "",
    familyName: "",
    organisation: "",
    contactNum: "",
    email: "",
  });

  const [sent, setSent] = useState(false);
  const userId = useParams().id;

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
      axios
        .get(`/user/${userId}`)
        .then((response) => {
          setFormData(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      console.log("new user. no set data");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userId) {
      console.log("creating new user");
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
          console.log("error", error);
        });

      // validation WIP
      // const validate = formSchema.validate(formData, { abortEarly: false })
      // console.log(validate.error)
    } else if (userId) {
      console.log("updating profile");
      axios
        .put(`/user/${userId}`, formData)
        .then((response) => {
          console.log("edited user data");
        })
        .catch((error) => {
          console.log("error", error);
        });
      console.log("after axios");
    }
  };

  if (sent) {
    const userId = sessionStorage.getItem("userId");
    return <Redirect to={`/user/${userId}`} />;
  }

  return (
    <div className="accForm">
      <Form onSubmit={handleSubmit}>
        <FormGroup as={Row} controlId="type">
          <FormLabel column sm="3">
            User Type:{" "}
          </FormLabel>
          {userId ? (
            <p>{formData.type}</p>
          ) : (
            <>
              <FormCheck
                inline
                label="Contributor"
                type="radio"
                value="Contributor"
                name="type"
                id="contributor"
                onClick={(event) =>
                  setFormData((state) => {
                    return { ...state, type: event.target.value };
                  })
                }
                checked={formData.type === "Contributor" && userId}
                disabled={formData.type === "Recipient" && userId}
              />
              <FormCheck
                inline
                label="Recipient"
                type="radio"
                value="Recipient"
                name="type"
                id="recipient"
                onClick={(event) =>
                  setFormData((state) => {
                    return { ...state, type: event.target.value };
                  })
                }
                checked={formData.type === "Recipient" && userId}
                disabled={formData.type === "Contributor" && userId}
              />
            </>
          )}
        </FormGroup>

        <FormGroup as={Row} controlId="username">
          <FormLabel column sm="3">
            Username:
          </FormLabel>
          <Col sm="6">
            <FormControl
              type="text"
              value={formData.username}
              onChange={(event) => {
                console.log(event.target.id);
                setFormData((state) => {
                  return { ...state, username: event.target.value };
                });
              }}
              onBlur={(event) => {
                console.log(event.target.value);
              }}
            />
            <FormText className="text-muted">
              Username must be at least 8 characters long
            </FormText>
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="password">
          <FormLabel column sm="3">
            Password:{" "}
          </FormLabel>
          <Col sm="6">
            <FormControl
              type="Password"
              value={formData.password}
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
              <Link to={`/user/${userId}/changepassword`}>Change Password</Link>
            </Col>
          ) : (
            ""
          )}
        </FormGroup>

        <FormGroup as={Row} controlId="firstName">
          <FormLabel column sm="3">
            First Name:{" "}
          </FormLabel>
          <Col sm="6">
            <FormControl
              type="text"
              value={formData.firstName}
              onChange={(event) => {
                setFormData((state) => {
                  return { ...state, firstName: event.target.value };
                });
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="familyName">
          <FormLabel column sm="3">
            Last Name:{" "}
          </FormLabel>
          <Col sm="6">
            <FormControl
              type="text"
              value={formData.familyName}
              onChange={(event) => {
                setFormData((state) => {
                  return { ...state, familyName: event.target.value };
                });
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="organisation">
          <FormLabel column sm="3">
            Organisation:{" "}
          </FormLabel>
          <Col sm="6">
            <FormControl
              type="text"
              value={formData.organisation}
              onChange={(event) => {
                setFormData((state) => {
                  return { ...state, organisation: event.target.value };
                });
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="contactNum">
          <FormLabel column sm="3">
            Contact Number:{" "}
          </FormLabel>
          <Col sm="6">
            <FormControl
              type="number"
              value={formData.contactNum}
              onChange={(event) => {
                setFormData((state) => {
                  return { ...state, contactNum: event.target.value };
                });
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="email">
          <FormLabel column sm="3">
            Email Address:{" "}
          </FormLabel>
          <Col sm="6">
            <FormControl
              type="email"
              value={formData.email}
              onChange={(event) => {
                setFormData((state) => {
                  return { ...state, email: event.target.value };
                });
              }}
            />
          </Col>
        </FormGroup>

        <Button variant="primary" type="submit">
          {userId ? "Save Changes" : "Create Account"}
        </Button>
      </Form>
    </div>
  );
};
export default AccountDetailsForm;
