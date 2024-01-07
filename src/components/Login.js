import React, { useState } from "react";
import { Form, Button, Nav } from "react-bootstrap";
import axios from "axios";
import Message from "./Message";
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const configuration = {
    method: "post",
    url: "https://auth-user-312bfaf7fa0a.herokuapp.com/api/users/login",
    data: {
      email,
      password,
    },
  };

  const handleSubmit = async (e) => {
    // prevent the form from refreshing the whole page`
    e.preventDefault();

    try {
      const { data } = await axios(configuration);
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.location.href = "/auth";
    } catch (er) {
      setMessage(er.response.data.message);
    }
  };
  return (
    <>
      <h2>Login</h2>
      {message && <Message variant="danger">{message}</Message>}

      <Form>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
        <br></br>
        <br></br>
        <Button variant="primary" type="submit">
          <Nav.Link href="/">Register</Nav.Link>
        </Button>
      </Form>
    </>
  );
};

export default Login;
