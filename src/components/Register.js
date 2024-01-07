import React, { useState } from "react";
import { Form, Button, Nav } from "react-bootstrap";
import axios from "axios";
import Message from "./Message";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const configuration = {
    method: "post",
    url: "https://auth-user-312bfaf7fa0a.herokuapp.com/api/users",
    data: {
      name,
      email,
      password,
    },
  };

  const handleSubmit = async (e) => {
    // prevent the form from refreshing the whole page`
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
      } else {
        const { data } = await axios(configuration);
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        window.location.href = "/auth";
      }
    } catch (er) {
      setMessage(er.response.data.message);
    }
  };
  return (
    <>
      <h2>Register</h2>
      {message && <Message variant="danger">{message}</Message>}
      <Form>
        {/* name */}
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </Form.Group>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>
        <br></br>
        <br></br>
        <Button variant="primary" type="submit">
          <Nav.Link href="/login">Login</Nav.Link>
        </Button>
      </Form>
    </>
  );
};

export default Register;
